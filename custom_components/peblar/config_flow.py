"""Config flow for the Peblar EV Charger integration."""
from __future__ import annotations

import logging
from typing import Any

import aiohttp
import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import PeblarApiClient, PeblarAuthError, PeblarConnectionError
from .const import DOMAIN

LOGGER = logging.getLogger(__name__)

STEP_USER_DATA_SCHEMA = vol.Schema(
    {
        vol.Required("host"): str,
        vol.Required("api_key"): str,
    }
)


class PeblarConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the config flow for Peblar EV Charger."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle the initial user step.

        Presents a form asking for the charger's hostname/IP and API key,
        validates the connection, sets the unique ID to the charger's serial
        number, and creates the config entry on success.
        """
        errors: dict[str, str] = {}

        if user_input is not None:
            host = user_input["host"].strip()
            api_key = user_input["api_key"].strip()

            session = async_get_clientsession(self.hass)
            client = PeblarApiClient(host=host, api_key=api_key, session=session)

            try:
                system_info = await client.async_validate_connection()
            except PeblarAuthError:
                LOGGER.debug("Authentication failed for host %s", host)
                errors["base"] = "invalid_auth"
            except PeblarConnectionError:
                LOGGER.debug("Connection error for host %s", host)
                errors["base"] = "cannot_connect"
            except Exception:  # noqa: BLE001
                LOGGER.exception("Unexpected error during config flow for host %s", host)
                errors["base"] = "unknown"
            else:
                serial_number: str = system_info.get(
                    "ProductSerialNumber", f"{host}-peblar"
                )

                await self.async_set_unique_id(serial_number)
                self._abort_if_unique_id_configured()

                return self.async_create_entry(
                    title=f"Peblar ({host})",
                    data={
                        "host": host,
                        "api_key": api_key,
                        "serial_number": serial_number,
                        "model_name": system_info.get("ModelName", "Peblar"),
                        "firmware_version": system_info.get("FirmwareVersion", ""),
                    },
                )

        return self.async_show_form(
            step_id="user",
            data_schema=STEP_USER_DATA_SCHEMA,
            errors=errors,
        )
