"""Switch platform for the Peblar EV Charger integration."""
from __future__ import annotations

import logging

from homeassistant.components.switch import SwitchEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import PeblarDataUpdateCoordinator

LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the Peblar smart charging switch from a config entry."""
    coordinator: PeblarDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([PeblarSmartChargingSwitch(coordinator=coordinator, entry=entry)])


class PeblarSmartChargingSwitch(
    CoordinatorEntity[PeblarDataUpdateCoordinator], SwitchEntity
):
    """Switch entity to enable or disable smart charging on the Peblar charger."""

    _attr_has_entity_name = True
    _attr_name = "Smart Charging"
    _attr_icon = "mdi:ev-station"

    def __init__(
        self,
        coordinator: PeblarDataUpdateCoordinator,
        entry: ConfigEntry,
    ) -> None:
        super().__init__(coordinator)
        self._entry = entry
        self._attr_unique_id = f"{entry.data['serial_number']}_smart_charging"

    @property
    def device_info(self) -> DeviceInfo:
        return DeviceInfo(
            identifiers={(DOMAIN, self._entry.data["serial_number"])},
            name="Peblar EV Charger",
            manufacturer="Peblar",
            model=self._entry.data.get("model_name", "Peblar"),
            sw_version=self._entry.data.get("firmware_version"),
        )

    @property
    def is_on(self) -> bool | None:
        if self.coordinator.data is None:
            return None
        try:
            return bool(self.coordinator.data["evse"]["SmartCharging"])
        except (KeyError, TypeError):
            return None

    async def async_turn_on(self, **kwargs: object) -> None:
        await self.coordinator.api.set_smart_charging(True)
        await self.coordinator.async_request_refresh()

    async def async_turn_off(self, **kwargs: object) -> None:
        await self.coordinator.api.set_smart_charging(False)
        await self.coordinator.async_request_refresh()
