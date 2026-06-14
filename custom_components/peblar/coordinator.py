"""Data update coordinator for the Peblar EV Charger integration."""
from __future__ import annotations

import asyncio
import logging
from datetime import timedelta
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import PeblarApiClient, PeblarApiError

LOGGER = logging.getLogger(__name__)


class PeblarDataUpdateCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Coordinator that fetches EVSE and meter data from the Peblar charger.

    Attributes:
        api: The underlying API client, exposed so entities can issue commands.
    """

    def __init__(
        self,
        hass: HomeAssistant,
        api: PeblarApiClient,
        update_interval: timedelta,
    ) -> None:
        """Initialise the coordinator.

        Args:
            hass: The Home Assistant instance.
            api: A configured PeblarApiClient instance.
            update_interval: How often to poll the charger for new data.
        """
        super().__init__(
            hass,
            LOGGER,
            name="Peblar",
            update_interval=update_interval,
        )
        self.api = api

    async def _async_update_data(self) -> dict[str, Any]:
        """Fetch EVSE and meter data concurrently.

        Returns:
            A dictionary with keys "evse" and "meter" containing the
            respective parsed API responses.

        Raises:
            UpdateFailed: If either API call fails.
        """
        try:
            evse_data, meter_data = await asyncio.gather(
                self.api.get_evse(),
                self.api.get_meter(),
            )
        except PeblarApiError as err:
            raise UpdateFailed(f"Error communicating with Peblar charger: {err}") from err

        LOGGER.debug("EVSE data: %s", evse_data)
        LOGGER.debug("Meter data: %s", meter_data)

        return {
            "evse": evse_data,
            "meter": meter_data,
        }
