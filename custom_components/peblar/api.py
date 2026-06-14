"""Peblar EV Charger API client."""
from __future__ import annotations

import logging
from typing import Any

import aiohttp

from .const import (
    API_BASE_PATH,
    API_ENDPOINT_CP,
    API_ENDPOINT_EVSE,
    API_ENDPOINT_METER,
    API_ENDPOINT_SYSTEM,
)

LOGGER = logging.getLogger(__name__)


class PeblarApiError(Exception):
    """Base exception for Peblar API errors."""


class PeblarConnectionError(PeblarApiError):
    """Exception for connection errors."""


class PeblarAuthError(PeblarApiError):
    """Exception for authentication errors."""


class PeblarApiClient:
    """Client for the Peblar EV Charger local REST API."""

    def __init__(
        self,
        host: str,
        api_key: str,
        session: aiohttp.ClientSession,
    ) -> None:
        """Initialize the API client.

        Args:
            host: Hostname or IP address of the Peblar charger.
            api_key: API key for Bearer token authentication.
            session: aiohttp ClientSession to use for requests.
        """
        self._base_url = f"http://{host}{API_BASE_PATH}"
        self._headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        self._session = session

    async def _get(self, endpoint: str) -> dict[str, Any]:
        """Perform a GET request to the given endpoint.

        Args:
            endpoint: API endpoint path (e.g. "/system").

        Returns:
            Parsed JSON response as a dictionary.

        Raises:
            PeblarAuthError: If the request returns 401 Unauthorized.
            PeblarConnectionError: If the request fails due to a network error.
            PeblarApiError: For other HTTP error responses.
        """
        url = f"{self._base_url}{endpoint}"
        LOGGER.debug("GET %s", url)
        try:
            async with self._session.get(url, headers=self._headers) as response:
                if response.status == 401:
                    raise PeblarAuthError(
                        f"Authentication failed for {url}: HTTP 401"
                    )
                if response.status != 200:
                    raise PeblarApiError(
                        f"Unexpected HTTP {response.status} from {url}"
                    )
                return await response.json()
        except PeblarApiError:
            raise
        except aiohttp.ClientConnectionError as err:
            raise PeblarConnectionError(
                f"Cannot connect to Peblar charger at {url}: {err}"
            ) from err
        except aiohttp.ClientError as err:
            raise PeblarConnectionError(
                f"Request to {url} failed: {err}"
            ) from err

    async def _put(self, endpoint: str, payload: dict[str, Any]) -> None:
        """Perform a PUT request to the given endpoint.

        Args:
            endpoint: API endpoint path (e.g. "/evse").
            payload: Dictionary to serialise as the JSON request body.

        Raises:
            PeblarAuthError: If the request returns 401 Unauthorized.
            PeblarConnectionError: If the request fails due to a network error.
            PeblarApiError: For other HTTP error responses.
        """
        url = f"{self._base_url}{endpoint}"
        LOGGER.debug("PUT %s payload=%s", url, payload)
        try:
            async with self._session.put(
                url, headers=self._headers, json=payload
            ) as response:
                if response.status == 401:
                    raise PeblarAuthError(
                        f"Authentication failed for {url}: HTTP 401"
                    )
                if response.status not in (200, 204):
                    raise PeblarApiError(
                        f"Unexpected HTTP {response.status} from PUT {url}"
                    )
        except PeblarApiError:
            raise
        except aiohttp.ClientConnectionError as err:
            raise PeblarConnectionError(
                f"Cannot connect to Peblar charger at {url}: {err}"
            ) from err
        except aiohttp.ClientError as err:
            raise PeblarConnectionError(
                f"PUT request to {url} failed: {err}"
            ) from err

    async def get_system(self) -> dict[str, Any]:
        """Fetch system information.

        Returns a dict containing at minimum:
        - ProductSerialNumber (str)
        - FirmwareVersion (str)
        - ModelName (str)
        """
        return await self._get(API_ENDPOINT_SYSTEM)

    async def get_evse(self) -> dict[str, Any]:
        """Fetch EVSE status.

        Returns a dict containing at minimum:
        - State (int): 1=Available, 2=Connected, 3=Charging, 4=Suspended, 5=Error
        - Error (int): Error code, 0 means no error
        - ChargingCurrentLimit (int): Configured limit in amperes
        - ChargingCurrentLimitActual (int): Active limit in amperes
        - SmartCharging (bool): Whether smart charging is enabled
        """
        return await self._get(API_ENDPOINT_EVSE)

    async def get_meter(self) -> dict[str, Any]:
        """Fetch meter/energy data.

        Returns a dict containing at minimum:
        - CurrentL1, CurrentL2, CurrentL3 (float): Phase currents in amperes
        - VoltageL1, VoltageL2, VoltageL3 (int): Phase voltages in volts
        - Power (int): Active power in watts
        - EnergySession (int): Energy delivered in current session in watt-hours
        - EnergyTotal (int): Lifetime total energy in watt-hours
        """
        return await self._get(API_ENDPOINT_METER)

    async def get_cp(self) -> dict[str, Any]:
        """Fetch charge point information."""
        return await self._get(API_ENDPOINT_CP)

    async def set_charging_current(self, amps: int) -> None:
        """Set the maximum charging current.

        Args:
            amps: Desired charging current limit in amperes (6–32 A).
        """
        await self._put(API_ENDPOINT_EVSE, {"ChargingCurrentLimit": amps})

    async def set_smart_charging(self, enabled: bool) -> None:
        """Enable or disable smart charging.

        Args:
            enabled: True to enable smart charging, False to disable.
        """
        await self._put(API_ENDPOINT_EVSE, {"SmartCharging": enabled})

    async def async_validate_connection(self) -> dict[str, Any]:
        """Validate that the charger is reachable and credentials are correct.

        Returns:
            System information dictionary from get_system().

        Raises:
            PeblarAuthError: If authentication fails.
            PeblarConnectionError: If the charger cannot be reached.
            PeblarApiError: For other API errors.
        """
        return await self.get_system()
