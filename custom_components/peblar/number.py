"""Number platform for the Peblar EV Charger integration."""
from __future__ import annotations

import logging

from homeassistant.components.number import (
    NumberDeviceClass,
    NumberEntity,
    NumberMode,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import UnitOfElectricCurrent
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN, MAX_CHARGING_CURRENT, MIN_CHARGING_CURRENT
from .coordinator import PeblarDataUpdateCoordinator

LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the Peblar charging current number entity from a config entry."""
    coordinator: PeblarDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([PeblarChargingCurrentNumber(coordinator=coordinator, entry=entry)])


class PeblarChargingCurrentNumber(
    CoordinatorEntity[PeblarDataUpdateCoordinator], NumberEntity
):
    """Number entity representing the maximum charging current of the Peblar charger.

    The slider allows the user to set a current limit between 6 A and 32 A
    in 1 A steps. Changing the value sends a PUT request to the charger and
    then requests a coordinator refresh so the UI reflects the new setting.
    """

    _attr_has_entity_name = True
    _attr_name = "Max Charging Current"
    _attr_native_min_value = float(MIN_CHARGING_CURRENT)
    _attr_native_max_value = float(MAX_CHARGING_CURRENT)
    _attr_native_step = 1.0
    _attr_native_unit_of_measurement = UnitOfElectricCurrent.AMPERE
    _attr_device_class = NumberDeviceClass.CURRENT
    _attr_mode = NumberMode.SLIDER

    def __init__(
        self,
        coordinator: PeblarDataUpdateCoordinator,
        entry: ConfigEntry,
    ) -> None:
        """Initialise the charging current number entity.

        Args:
            coordinator: The data update coordinator.
            entry: The config entry this entity belongs to.
        """
        super().__init__(coordinator)
        self._entry = entry
        self._attr_unique_id = f"{entry.data['serial_number']}_charging_current_limit"

    @property
    def device_info(self) -> DeviceInfo:
        """Return device information linking this entity to the charger device."""
        return DeviceInfo(
            identifiers={(DOMAIN, self._entry.data["serial_number"])},
            name="Peblar EV Charger",
            manufacturer="Peblar",
            model=self._entry.data.get("model_name", "Peblar"),
            sw_version=self._entry.data.get("firmware_version"),
        )

    @property
    def native_value(self) -> float | None:
        """Return the current charging current limit from coordinator data."""
        if self.coordinator.data is None:
            return None
        try:
            return float(self.coordinator.data["evse"]["ChargingCurrentLimit"])
        except (KeyError, TypeError) as err:
            LOGGER.debug("Could not read ChargingCurrentLimit: %s", err)
            return None

    async def async_set_native_value(self, value: float) -> None:
        """Set a new maximum charging current on the charger.

        Args:
            value: The desired current limit in amperes. Will be rounded to
                   the nearest integer before being sent to the charger.
        """
        amps = int(round(value))
        LOGGER.debug("Setting charging current limit to %d A", amps)
        await self.coordinator.api.set_charging_current(amps)
        await self.coordinator.async_request_refresh()
