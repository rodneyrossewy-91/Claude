"""Constants for the Peblar EV Charger integration."""
from __future__ import annotations

DOMAIN = "peblar"

# API paths
API_BASE_PATH = "/api/wlac/v1"
API_ENDPOINT_SYSTEM = "/system"
API_ENDPOINT_EVSE = "/evse"
API_ENDPOINT_METER = "/meter"
API_ENDPOINT_CP = "/cp"

# EVSE state mapping
EVSE_STATES: dict[int, str] = {
    1: "Available",
    2: "Connected",
    3: "Charging",
    4: "Suspended",
    5: "Error",
}

# Polling interval in seconds
DEFAULT_SCAN_INTERVAL = 30

# Charging current limits in amperes
MIN_CHARGING_CURRENT = 6
MAX_CHARGING_CURRENT = 32

# Platforms to set up
PLATFORMS: list[str] = ["sensor", "number", "switch"]
