---
sidebar_position: 1
title: Overview
description: Deliver crop-specific agronomic advice, pest management tips, and best farming practices.
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiResponse from '@site/src/components/ApiResponse';
import InfoBlock from '@site/src/components/InfoBlock';

# Agronomics API

Deliver crop-specific guidance, pest and disease management recommendations, and best farming practices tailored to local conditions and seasonal contexts.

## What You Get

| Feature | Description |
|---|---|
| 🌱 **Crop guidance** | Planting calendars, spacing, soil preparation, and variety recommendations |
| 🐛 **Pest & disease management** | Identification, prevention, and treatment strategies |
| 💧 **Irrigation advice** | Water management based on crop stage and weather conditions |
| 🧪 **Soil & fertilizer guidance** | Nutrient requirements, soil testing, and fertilizer application schedules |
| 📅 **Seasonal calendars** | Region-specific planting and harvesting timelines |

---

## Quick Start

Fetch agronomic advice for a specific crop:

<ApiCodeToggler
  method="GET"
  endpoint="/dev/agronomics?crop=maize&region=greater-accra"
  token="YOUR_API_KEY"
  label="GET CROP ADVICE"
/>

<ApiResponse
  title="200 OK"
  data={{
    crop: "Maize",
    region: "Greater Accra",
    season: "Major (March - July)",
    advice: {
      planting: {
        optimalPeriod: "March 15 - April 30",
        spacing: "75cm x 40cm",
        seedRate: "20-25 kg/ha",
        varieties: ["Obatanpa", "Mamaba", "Abontem"]
      },
      soilPrep: {
        ploughingDepth: "15-20 cm",
        soilType: "Well-drained loamy soil preferred",
        phRange: "5.5 - 7.0"
      },
      fertilizer: {
        basalApplication: "2 bags NPK 15-15-15 per acre at planting",
        topDressing: "1.5 bags Sulphate of Ammonia per acre at 4 weeks",
        foliar: "Optional micro-nutrient spray at tasselling stage"
      }
    },
    updatedAt: "2026-04-01T00:00:00.000Z"
  }}
/>

:::info Authentication Required
Agronomics endpoints require API Key authentication. See the [Authentication guide](../getting-started/authentication) to set up your credentials.
:::

---

## Endpoints

### Get Crop Advice

<span class="badge--get">GET</span> `/api/v1/dev/agronomics`

Returns agronomic advice for a specific crop and region.

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `crop` | `string` | ✅ | Crop name (e.g., `maize`, `rice`, `cassava`) |
| `region` | `string` | ❌ | Region code for localized advice |
| `stage` | `string` | ❌ | Crop growth stage (`planting`, `vegetative`, `flowering`, `harvest`) |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `crop` | `string` | Crop name |
| `region` | `string` | Region for the advice |
| `season` | `string` | Current growing season |
| `advice` | `object` | Structured agronomic recommendations |
| `advice.planting` | `object` | Planting guidance |
| `advice.soilPrep` | `object` | Soil preparation tips |
| `advice.fertilizer` | `object` | Fertilizer recommendations |

---

### Get Pest & Disease Info

<span class="badge--get">GET</span> `/api/v1/dev/agronomics/pests`

Returns pest and disease identification with management recommendations.

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `crop` | `string` | ✅ | Crop name |
| `symptom` | `string` | ❌ | Observed symptom for identification |

**Example:**

<ApiCodeToggler
  method="GET"
  endpoint="/dev/agronomics/pests?crop=maize&symptom=leaf-blight"
  token="YOUR_API_KEY"
  label="GET PEST INFO"
/>

<ApiResponse
  title="200 OK"
  data={{
    crop: "Maize",
    pests: [
      {
        name: "Northern Leaf Blight",
        type: "disease",
        causedBy: "Exserohilum turcicum (fungus)",
        symptoms: [
          "Long, elliptical grey-green lesions on leaves",
          "Lesions turn tan as they mature",
          "Severe cases: leaves dry up completely"
        ],
        conditions: "Cool temperatures (18-27°C) with high humidity",
        management: {
          cultural: [
            "Plant resistant varieties (Obatanpa, Mamaba)",
            "Rotate crops — avoid continuous maize planting",
            "Remove and destroy infected crop debris"
          ],
          chemical: [
            "Apply Mancozeb (2.5 kg/ha) at first sign of symptoms",
            "Follow up with Azoxystrobin if disease persists"
          ],
          biological: [
            "Use Trichoderma-based bio-fungicides as preventive treatment"
          ]
        },
        severity: "moderate"
      }
    ]
  }}
/>

---

### Get Seasonal Calendar

<span class="badge--get">GET</span> `/api/v1/dev/agronomics/calendar`

Returns a seasonal planting and activity calendar for a region.

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `region` | `string` | ✅ | Region code |
| `year` | `number` | ❌ | Calendar year (default: current year) |

**Example:**

<ApiCodeToggler
  method="GET"
  endpoint="/dev/agronomics/calendar?region=greater-accra&year=2026"
  token="YOUR_API_KEY"
  label="GET SEASONAL CALENDAR"
/>

<ApiResponse
  title="200 OK"
  data={{
    region: "Greater Accra",
    year: 2026,
    seasons: [
      {
        name: "Major Season",
        period: "March - July",
        activities: [
          { month: "March", activity: "Land preparation, early planting of maize" },
          { month: "April", activity: "Complete planting, first fertilizer application" },
          { month: "May", activity: "Weeding, pest scouting, top-dressing" },
          { month: "June", activity: "Flowering stage management, pest control" },
          { month: "July", activity: "Harvesting, drying, and storage" }
        ]
      },
      {
        name: "Minor Season",
        period: "September - December",
        activities: [
          { month: "September", activity: "Land preparation, planting" },
          { month: "October", activity: "Fertilizer application, weeding" },
          { month: "November", activity: "Pest monitoring, crop management" },
          { month: "December", activity: "Harvesting and post-harvest handling" }
        ]
      }
    ]
  }}
/>

---

## Supported Crops

| Category | Crops |
|---|---|
| **Cereals** | Maize, Rice, Millet, Sorghum |
| **Root & Tubers** | Cassava, Yam, Sweet Potato |
| **Legumes** | Groundnut, Cowpea, Soybean |
| **Vegetables** | Tomato, Pepper, Onion, Okra, Garden Eggs |
| **Cash Crops** | Cocoa, Cashew, Oil Palm |
| **Fruits** | Plantain, Banana, Mango, Pineapple, Citrus |

---

## Use Cases

### Mobile Farmer Advisory App

<ApiResponse
  title="advisory-app.js"
  language="node"
  data={`async function getDailyAdvice(farmerProfile) {
  const { crop, region, lat, lon } = farmerProfile;

  // Fetch agronomics + weather together for smart advice
  const [agro, weather] = await Promise.all([
    fetchAgronomics(crop, region),
    fetchWeather(lat, lon),
  ]);

  // Combine weather context with crop advice
  const advice = [];

  if (weather.current.humidity > 80) {
    advice.push('⚠️ High humidity detected — scout for fungal diseases');
  }

  if (weather.current.temperature > 35) {
    advice.push('🌡️ High temperature — increase irrigation frequency');
  }

  advice.push(\\\`📋 Current season: \\\${agro.season}\\\`);
  advice.push(\\\`🌱 Recommended varieties: \\\${agro.advice.planting.varieties.join(', ')}\\\`);

  return advice;
}`}
/>

### Voice-Based Advisory (IVR)

<InfoBlock title="IVR SYSTEM">
{`🔊 Welcome to Farm Advisory.

Press 1 for Maize advice
Press 2 for Rice advice
Press 3 for Cassava advice

> 1

"Good morning, farmer. This is the major planting
season for maize. The recommended planting period
is March 15 to April 30. Use a spacing of 75 by 40
centimeters. Recommended varieties for your region
include Obatanpa and Mamaba.

Current weather shows high humidity. Please scout
your fields for signs of leaf blight."`}
</InfoBlock>

---

## Rate Limits

| Plan | Requests / Day | Crop Coverage | Pest Database |
|---|---|---|---|
| Basic | 100 | 5 crops | Basic |
| Pro | 5,000 | All crops | Full |
| Enterprise | Unlimited | All + Custom | Full + Advisory |

---

## Next Steps

- **[Market Prices →](../market-price/overview)** — Combine advice with pricing intelligence
- **[Weather →](../weather/overview)** — Weather-informed crop management
- **[Authentication →](../getting-started/authentication)** — Set up API access
