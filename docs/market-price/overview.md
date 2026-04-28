---
sidebar_position: 1
title: Overview
description: Access real-time agricultural commodity market prices across regions and markets.
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiResponse from '@site/src/components/ApiResponse';
import InfoBlock from '@site/src/components/InfoBlock';

# Market Price API

Access real-time and historical commodity price data across agricultural markets. Help farmers make better selling decisions with accurate, up-to-date pricing intelligence.

## What You Get

| Feature | Description |
|---|---|
| 📊 **Real-time prices** | Current market prices for agricultural commodities updated throughout the day |
| 🌍 **Multi-market coverage** | Price data across multiple regional and national markets |
| 📈 **Historical data** | Track price trends and seasonal patterns over time |
| 🔔 **Price alerts** | Build threshold-based notifications for farmers |

---

## Quick Start

Fetch all available commodity prices with a single API call:

<ApiCodeToggler
  method="GET"
  endpoint="/dev/commodities"
  token="YOUR_API_KEY"
  label="GET COMMODITY PRICES"
/>

<ApiResponse
  title="200 OK"
  data={[
    {
      id: "c1d2e3f4-a5b6-7890-cdef-123456789abc",
      name: "Maize",
      unit: "kg",
      price: 450.00
    },
    {
      id: "c2e3f4a5-b6c7-8901-defa-234567890bcd",
      name: "Rice (Local)",
      unit: "kg",
      price: 680.00
    },
    {
      id: "c3f4a5b6-c7d8-9012-efab-345678901cde",
      name: "Cassava",
      unit: "kg",
      price: 120.00
    }
  ]}
/>

:::info Authentication Required
Market price endpoints require API Key authentication. See the [Authentication guide](../api/authentication) to set up your credentials.
:::

---

## Available Commodities

The API provides pricing data for a range of agricultural commodities commonly traded across African markets:

| Category | Commodities |
|---|---|
| **Cereals & Grains** | Maize, Rice (Local), Rice (Imported), Millet, Sorghum, Wheat |
| **Root & Tubers** | Cassava, Yam, Sweet Potato, Cocoyam |
| **Legumes** | Groundnuts, Cowpea, Soybean |
| **Cash Crops** | Cocoa, Cashew, Shea Butter, Palm Oil |
| **Vegetables** | Tomato, Onion, Pepper, Garden Eggs |
| **Fruits** | Plantain, Banana, Pineapple, Mango |

---

## Endpoints

### Get All Commodities

<span class="badge--get">GET</span> `/api/v1/dev/commodities`

Returns all commodities with their current market prices.

**Headers:**

| Header | Value | Required |
|---|---|---|
| `Authorization` | `Bearer <api-key>` | ✅ |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `id` | `string` (UUID) | Unique commodity identifier |
| `name` | `string` | Commodity display name |
| `unit` | `string` | Unit of measurement (`kg`, `bag`, `tuber`, etc.) |
| `price` | `number` | Current price per unit in local currency |

---

## Use Cases

### 1. Market Price Dashboard

Build a web or mobile dashboard showing daily commodity prices:

<ApiResponse
  title="price-dashboard.js"
  language="node"
  data={`async function fetchMarketPrices() {
  const response = await fetch(
    'https://api.e-Content.com/api/v1/dev/commodities',
    { headers: { 'Authorization': \\\`Bearer \\\${API_KEY}\\\` } }
  );

  const commodities = await response.json();

  // Group by category for display
  const cereals = commodities.filter(c =>
    ['Maize', 'Rice (Local)', 'Millet'].includes(c.name)
  );

  return { cereals, all: commodities };
}`}
/>

### 2. SMS Price Alerts

Send farmers automated SMS alerts when prices hit their target:

<ApiResponse
  title="sms_alerts.py"
  language="python"
  data={`import requests

def check_and_alert(api_key, thresholds):
    """Check prices and send SMS alerts for threshold breaches."""
    commodities = requests.get(
        "https://api.e-Content.com/api/v1/dev/commodities",
        headers={"Authorization": f"Bearer {api_key}"}
    ).json()

    alerts = []
    for commodity in commodities:
        if commodity["name"] in thresholds:
            target = thresholds[commodity["name"]]
            if commodity["price"] >= target["sell_above"]:
                alerts.append(
                    f"📈 {commodity['name']}: GHS {commodity['price']}/{commodity['unit']} "
                    f"- GOOD TIME TO SELL!"
                )
    return alerts

# Example thresholds
thresholds = {
    "Maize": {"sell_above": 500},
    "Rice (Local)": {"sell_above": 700},
}`}
/>

### 3. USSD Market Info Service

Serve market prices through USSD for farmers without smartphones:

<InfoBlock title="USSD INTERFACE">
{`*123*1# → Market Prices
  1. Cereals & Grains
  2. Root & Tubers
  3. Vegetables

> 1

Cereals & Grains (Today):
- Maize: GHS 450/kg
- Rice: GHS 680/kg
- Millet: GHS 320/kg`}
</InfoBlock>

---

## Rate Limits

Market price requests are subject to rate limits based on your subscription plan:

| Plan | Requests / Day | Data Freshness |
|---|---|---|
| Basic | 100 | Delayed (hourly) |
| Pro | 5,000 | Real-time |
| Enterprise | Unlimited | Real-time |

---

## Next Steps

- **[Authentication →](../api/authentication)** — Set up API key access
- **[Weather Updates →](../weather/overview)** — Combine price data with weather forecasts
- **[Agronomic Advice →](../agronomics/overview)** — Pair pricing with crop management tips
