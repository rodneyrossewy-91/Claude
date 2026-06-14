"""Sensor platform for the Peblar EV Charger integration."""
from __future__ import annotations

import logging
from collections.abc import Callable
from dataclasses import dataclass, field
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import UnitOfElectricCurrent, UnitOfElectricPotential, UnitOfEnergy, UnitOfPower
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN, EVSE_STATES
from .coordinator import PeblarDataUpdateCoordinator

LOGGER = logging.getLogger(__name__)


@dataclass(frozen=True, kw_only=True)
class PeblarSensorEntityDescription(SensorEntityDescription):
    """Describes a Peblar sensor entity.

    Extends the standard SensorEntityDescription with a callable that
    extracts the sensor value from the coordinator data dictionary.
    """

    value_fn: Callable[[dict[str, Any]], Any] = field(
        default=lambda data: None
    )


SENSOR_DESCRIPTIONS: tuple[PeblarSensorEntityDescription, ...] = (
    PeblarSensorEntityDescription(
        key="power",
        name="Power",
        native_unit_of_measurement=UnitOfPower.WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data: data["meter"]["Power"],
    ),
    PeblarSensorEntityDescription(
        key="current_l1",
        name="Current L1",
        native_unit_of_measurement=UnitOfElectricCurrent.AMPERE,
        device_class=SensorDeviceClass.CURRENT,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data: data["meter"]["CurrentL1"],
    ),
    PeblarSensorEntityDescription(
        key="current_l2",
        name="Current L2",
        native_unit_of_measurement=UnitOfElectricCurrent.AMPERE,
        device_class=SensorDeviceClass.CURRENT,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data: data["meter"]["CurrentL2"],
    ),
    PeblarSensorEntityDescription(
        key="current_l3",
        name="Current L3",
        native_unit_of_measurement=UnitOfElectricCurrent.AMPERE,
        device_class=SensorDeviceClass.CURRENT,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data: data["meter"]["CurrentL3"],
    ),
    PeblarSensorEntityDescription(
        key="voltage_l1",
        name="Voltage L1",
        native_unit_of_measurement=UnitOfElectricPotential.VOLT,
        device_class=SensorDeviceClass.VOLTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data: data["meter"]["VoltageL1"],
    ),
    PeblarSensorEntityDescription(
        key="voltage_l2",
        name="Voltage L2",
        native_unit_of_measurement=UnitOfElectricPotential.VOLT,
        device_class=SensorDeviceClass.VOLTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data: data["meter"]["VoltageL2"],
    ),
    PeblarSensorEntityDescription(
        key="voltage_l3",
        name="Voltage L3",
        native_unit_of_measurement=UnitOfElectricPotential.VOLT,
        device_class=SensorDeviceClass.VOLTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data: data["meter"]["VoltageL3"],
    ),
    PeblarSensorEntityDescription(
        key="energy_session",
        name="Session Energy",
        native_unit_of_measurement=UnitOfEnergy.KILO_WATT_HOUR,
        device_class=SensorDeviceClass.ENERGY,
        state_class=SensorStateClass.TOTAL,
        value_fn=lambda data: round(data["meter"]["EnergySession"] / 1000, 3),
    ),
    PeblarSensorEntityDescription(
        key="energy_total",
        name="Total Energy",
        native_unit_of_measurement=UnitOfEnergy.KILO_WATT_HOUR,
        device_class=SensorDeviceClass.ENERGY,
        state_class=SensorStateClass.TOTAL_INCREASING,
        value_fn=lambda data: round(data["meter"]["EnergyTotal"] / 1000, 3),
    ),
    PeblarSensorEntityDescription(
        key="charging_state",
        name="Charging State",
        native_unit_of_measurement=None,
        device_class=None,
        state_class=None,
        value_fn=lambda data: EVSE_STATES.get(data["evse"]["State"], "Unknown"),
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Peblar sensors from a config entry.

    Creates one PeblarSensor entity for every description in
    SENSOR_DESCRIPTIONS and registers them with Home Assistant.
    """
    coordinator: PeblarDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]

    async_add_entities(
        PeblarSensor(coordinator=coordinator, entry=entry, description=description)
        for description in SENSOR_DESCRIPTIONS
    )


class PeblarSensor(CoordinatorEntity[PeblarDataUpdateCoordinator], SensorEntity):
    """Representation of a Peblar EV Charger sensor."""

    entity_description: PeblarSensorEntityDescription
    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: PeblarDataUpdateCoordinator,
        entry: ConfigEntry,
        description: PeblarSensorEntityDescription,
    ) -> None:
        """Initialise the sensor.

        Args:
            coordinator: The data update coordinator.
            entry: The config entry this entity belongs to.
            description: The entity description for this sensor.
        """
        super().__init__(coordinator)
        self.entity_description = description
        self._entry = entry
        self._attr_unique_id = f"{entry.data['serial_number']}_{description.key}"

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
    def native_value(self) -> Any:
        """Return the current sensor value extracted from coordinator data."""
        try:
            return self.entity_description.value_fn(self.coordinator.data)
        except (KeyError, TypeError) as err:
            LOGGER.debug(
                "Could not read value for sensor %s: %s",
                self.entity_description.key,
                err,
            )
            return None
