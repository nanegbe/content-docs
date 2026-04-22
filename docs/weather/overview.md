---
sidebar_position: 1
title: Overview
description: Deliver hyperlocal weather forecasts, alerts, and seasonal outlooks for agricultural planning.
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';

# Weather API

Deliver localized weather forecasts, severe weather alerts, and seasonal outlooks to help farmers plan planting, irrigation, and harvesting activities.

## What You Get

| Feature | Description |
|---|---|
| 🌤️ **Current conditions** | Temperature, humidity, wind speed, and precipitation for any location |
| 📅 **Daily forecasts** | 7-day and 14-day weather forecasts at farm-level precision |
| ⚠️ **Severe weather alerts** | Real-time notifications for storms, floods, droughts, and extreme heat |
| 🌧️ **Rainfall data** | Historical and predicted rainfall patterns for planting decisions |
| 📊 **Seasonal outlook** | Long-range seasonal forecasts for crop planning |

---

## Quick Start

Fetch the current weather conditions for a location:

<ApiCodeToggler
  method="GET"
  endpoint="/dev/weather?lat=5.6037&lon=-0.1870"
  token="YOUR_API_KEY"
  label="GET CURRENT WEATHER"
/>

```json title="Response — 200 OK"
{
  "location": {
    "lat": 5.6037,
    "lon": -0.1870,
    "name": "Accra",
    "region": "Greater Accra",
    "country": "GH"
  },
  "current": {
    "temperature": 31.2,
    "humidity": 72,
    "windSpeed": 14.5,
    "windDirection": "SW",
    "condition": "Partly Cloudy",
    "precipitation": 0,
    "uvIndex": 8
  },
  "updatedAt": "2026-04-21T14:30:00.000Z"
}
```

:::info Authentication Required
Weather endpoints require API Key authentication. See the [Authentication guide](../getting-started/authentication) to set up your credentials.
:::

---

## Endpoints

### Get Current Weather

<span class="badge--get">GET</span> `/api/v1/dev/weather`

Returns current weather conditions for a given location.

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `lat` | `number` | ✅ | Latitude of the location |
| `lon` | `number` | ✅ | Longitude of the location |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `location` | `object` | Resolved location details |
| `current.temperature` | `number` | Temperature in °C |
| `current.humidity` | `number` | Relative humidity (%) |
| `current.windSpeed` | `number` | Wind speed in km/h |
| `current.windDirection` | `string` | Wind direction (N, NE, E, etc.) |
| `current.condition` | `string` | Human-readable weather condition |
| `current.precipitation` | `number` | Precipitation in mm |
| `current.uvIndex` | `number` | UV index (0–11+) |

---

### Get Weather Forecast

<span class="badge--get">GET</span> `/api/v1/dev/weather/forecast`

Returns a multi-day weather forecast for a given location.

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `lat` | `number` | ✅ | Latitude of the location |
| `lon` | `number` | ✅ | Longitude of the location |
| `days` | `number` | ❌ | Number of forecast days (default: `7`, max: `14`) |

**Example:**

<ApiCodeToggler
  method="GET"
  endpoint="/dev/weather/forecast?lat=5.6037&lon=-0.1870&days=7"
  token="YOUR_API_KEY"
  label="GET WEATHER FORECAST"
/>

```json title="Response — 200 OK"
{
  "location": {
    "lat": 5.6037,
    "lon": -0.1870,
    "name": "Accra",
    "country": "GH"
  },
  "forecast": [
    {
      "date": "2026-04-22",
      "tempMin": 24.5,
      "tempMax": 32.1,
      "humidity": 75,
      "precipitation": 2.3,
      "condition": "Light Rain",
      "description": "Light showers expected in the afternoon"
    },
    {
      "date": "2026-04-23",
      "tempMin": 25.0,
      "tempMax": 33.4,
      "humidity": 68,
      "precipitation": 0,
      "condition": "Sunny",
      "description": "Clear skies, good conditions for harvesting"
    }
  ]
}
```

---

### Get Weather Alerts

<span class="badge--get">GET</span> `/api/v1/dev/weather/alerts`

Returns active severe weather alerts for a location or region.

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `lat` | `number` | ✅ | Latitude of the location |
| `lon` | `number` | ✅ | Longitude of the location |
| `radius` | `number` | ❌ | Alert radius in km (default: `50`) |

**Example:**

<ApiCodeToggler
  method="GET"
  endpoint="/dev/weather/alerts?lat=5.6037&lon=-0.1870"
  token="YOUR_API_KEY"
  label="GET WEATHER ALERTS"
/>

```json title="Response — 200 OK"
{
  "alerts": [
    {
      "id": "alert-uuid",
      "type": "HEAVY_RAIN",
      "severity": "warning",
      "title": "Heavy Rainfall Warning",
      "description": "Heavy rainfall expected in Greater Accra region. Risk of localized flooding in low-lying farm areas.",
      "startTime": "2026-04-22T06:00:00.000Z",
      "endTime": "2026-04-22T18:00:00.000Z",
      "affectedArea": "Greater Accra Region"
    }
  ]
}
```

---

## Alert Severity Levels

| Severity | Icon | Description |
|---|---|---|
| `advisory` | 🟡 | Minor impact on farming activities |
| `warning` | 🟠 | Moderate impact — take precautionary measures |
| `critical` | 🔴 | Severe impact — immediate action required |

## Alert Types

| Type | Description | Farming Impact |
|---|---|---|
| `HEAVY_RAIN` | Heavy rainfall expected | Risk of flooding, waterlogging, crop damage |
| `DROUGHT` | Extended dry period | Irrigation planning, water conservation needed |
| `EXTREME_HEAT` | Temperatures above normal | Crop stress, increased pest activity |
| `STRONG_WIND` | High wind speeds | Risk to tall crops, spraying not recommended |
| `FROST` | Temperatures near or below freezing | Protect sensitive crops, delay planting |
| `FLOOD` | Flood risk in the area | Evacuate livestock, protect stored harvest |

---

## Use Cases

### Farm Planning Assistant

```javascript title="farm-planner.js"
async function getPlantingAdvice(lat, lon) {
  const [weather, forecast] = await Promise.all([
    fetchWeather(lat, lon),
    fetchForecast(lat, lon, 7),
  ]);

  const totalRainfall = forecast.forecast.reduce(
    (sum, day) => sum + day.precipitation, 0
  );

  let advice = '';

  if (totalRainfall > 50) {
    advice = '🌧️ Heavy rain expected this week. Delay planting and ensure drainage channels are clear.';
  } else if (totalRainfall > 20) {
    advice = '🌤️ Moderate rainfall expected. Good conditions for planting maize and beans.';
  } else {
    advice = '☀️ Dry week ahead. Ensure irrigation is available before planting.';
  }

  return {
    currentTemp: weather.current.temperature,
    weeklyRainfall: totalRainfall,
    advice,
  };
}
```

### SMS Weather Alerts

```
⚠️ WEATHER ALERT
Heavy Rainfall Warning for Greater Accra
22 Apr 6:00AM - 6:00PM

Action: Ensure drainage channels
are clear. Delay spraying. Protect
stored harvest from moisture.

Reply STOP to opt out.
```

---

## Rate Limits

| Plan | Requests / Day | Forecast Range | Alerts |
|---|---|---|---|
| Basic | 100 | 3-day | — |
| Pro | 5,000 | 7-day | ✅ |
| Enterprise | Unlimited | 14-day | ✅ + Custom |

---

## Next Steps

- **[Market Prices →](../market-price/overview)** — Combine weather with pricing data
- **[Agronomic Advice →](../agronomics/overview)** — Weather-informed crop management
- **[Authentication →](../getting-started/authentication)** — Set up API access
