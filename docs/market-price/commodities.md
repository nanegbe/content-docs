---
sidebar_position: 6
title: Commodities
description: API reference for retrieving commodity market price data.
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiResponse from '@site/src/components/ApiResponse';

# Commodities

Access commodity market price data including crop prices, units, and market information. This is a core endpoint for delivering market intelligence to farmers.

**Base URL:** `https://api.e-Content.com/api/v1/dev/commodities`

---

## Overview

The Commodities API provides real-time and historical market price data for agricultural products. Use this data to:

- Display current market prices in farmer-facing applications
- Build price comparison tools across different markets
- Power SMS/USSD price alert services
- Analyze price trends and seasonal patterns

:::info Developer Endpoint
The commodities endpoint is currently under the `/dev/` namespace. This indicates it is in active development. The endpoint requires API Key authentication and usage guard protection.
:::

---

## Get All Commodities

<span class="badge--get">GET</span> `/api/v1/dev/commodities`

Retrieves all available commodities with their current market prices.

### Request

**Headers:**

| Header | Value | Required |
|---|---|---|
| `Authorization` | `Bearer <api-key>` | ✅ |

**Example:**

<ApiCodeToggler
  method="GET"
  endpoint="/dev/commodities"
  token="sk_live_xxxxxxxxxxxxxx"
  label="GET ALL COMMODITIES"
/>

### Response

**200 OK:**

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
    },
    {
      id: "c4a5b6c7-d8e9-0123-fabc-456789012def",
      name: "Cocoa",
      unit: "kg",
      price: 2850.00
    },
    {
      id: "c5b6c7d8-e9f0-1234-abcd-567890123ef0",
      name: "Groundnuts",
      unit: "kg",
      price: 520.00
    }
  ]}
/>

### Response Fields

| Field | Type | Description |
|---|---|---|
| `id` | `string` (UUID) | Unique identifier for the commodity |
| `name` | `string` | Commodity name (e.g., `"Maize"`, `"Rice (Local)"`) |
| `unit` | `string` | Unit of measurement (e.g., `"kg"`, `"bag"`, `"oz"`) |
| `price` | `number` | Current price per unit in local currency |

---

## Usage Examples

### JavaScript — Displaying Market Prices

```javascript title="market-prices.js"
const API_KEY = process.env.AGRI_CONTENT_API_KEY;

async function displayMarketPrices() {
  const response = await fetch(
    'https://api.e-Content.com/api/v1/dev/commodities',
    {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    }
  );

  const commodities = await response.json();

  // Sort by price descending
  commodities.sort((a, b) => b.price - a.price);

  console.log('═══════════════════════════════════');
  console.log('  📊 Today\'s Market Prices');
  console.log('═══════════════════════════════════');

  commodities.forEach(({ name, price, unit }) => {
    console.log(`  ${name.padEnd(20)} GHS ${price.toFixed(2)}/${unit}`);
  });
}

displayMarketPrices();
```

### Python — Price Alert Service

```python title="price_alerts.py"
import os
import requests

API_KEY = os.environ["AGRI_CONTENT_API_KEY"]
BASE_URL = "https://api.e-Content.com/api/v1"

def check_price_alerts(thresholds: dict):
    """Check if any commodity prices exceed alert thresholds."""
    response = requests.get(
        f"{BASE_URL}/dev/commodities",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    commodities = response.json()

    alerts = []
    for commodity in commodities:
        name = commodity["name"]
        price = commodity["price"]

        if name in thresholds and price >= thresholds[name]:
            alerts.append({
                "commodity": name,
                "current_price": price,
                "threshold": thresholds[name],
                "unit": commodity["unit"],
            })

    return alerts

# Example: alert when maize exceeds 500 GHS/kg
thresholds = {"Maize": 500, "Rice (Local)": 700}
alerts = check_price_alerts(thresholds)

for alert in alerts:
    print(f"⚠️  {alert['commodity']} has reached "
          f"GHS {alert['current_price']}/{alert['unit']} "
          f"(threshold: GHS {alert['threshold']})")
```

---

## Common Use Cases

| Use Case | Description |
|---|---|
| **Price dashboards** | Build real-time dashboards showing commodity prices across regions |
| **SMS price alerts** | Notify farmers via SMS when commodity prices hit target levels |
| **USSD market info** | Serve market prices via USSD for farmers without smartphones |
| **Price analytics** | Track historical pricing trends and seasonal patterns |
| **Trading platforms** | Enable commodity trading with live pricing data |

---

## Related

- **[API Keys →](./api-keys)** — Generate an API key to access this endpoint
- **[Plans →](./plans)** — Subscription tiers determine rate limits and data access
