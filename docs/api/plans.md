---
sidebar_position: 2
title: Plans
description: API reference for managing subscription plans — list, retrieve, and create plans.
---

# Plans

Manage subscription plans that determine user access levels and pricing tiers.

**Base URL:** `https://api.agri-content.com/api/v1/plans`

---

## Get All Plans

<span class="badge--get">GET</span> `/api/v1/plans`

Retrieves a list of all available subscription plans. No authentication required.

### Request

**Example:**

```bash
curl -X GET https://api.agri-content.com/api/v1/plans
```

### Response

**200 OK:**

```json
[
  {
    "id": "p1a2b3c4-d5e6-7890-abcd-ef1234567890",
    "name": "Basic",
    "price": 9.99,
    "features": [
      "100 API calls/day",
      "Market prices (delayed)",
      "Basic weather data"
    ]
  },
  {
    "id": "p2b3c4d5-e6f7-8901-bcde-f12345678901",
    "name": "Pro",
    "price": 29.99,
    "features": [
      "5,000 API calls/day",
      "Real-time market prices",
      "Advanced weather forecasts",
      "Agronomic advice"
    ]
  },
  {
    "id": "p3c4d5e6-f7a8-9012-cdef-234567890123",
    "name": "Enterprise",
    "price": 99.99,
    "features": [
      "Unlimited API calls",
      "Real-time market prices",
      "Advanced weather + alerts",
      "Custom agronomic content",
      "Priority support",
      "Webhook integrations"
    ]
  }
]
```

---

## Get Plan by ID

<span class="badge--get">GET</span> `/api/v1/plans/:id`

Retrieves the details of a specific plan by its unique ID.

### Request

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` (UUID) | ✅ | The unique identifier of the plan |

**Example:**

```bash
curl -X GET https://api.agri-content.com/api/v1/plans/p1a2b3c4-d5e6-7890-abcd-ef1234567890
```

### Responses

**200 OK:**

```json
{
  "id": "p1a2b3c4-d5e6-7890-abcd-ef1234567890",
  "name": "Basic",
  "price": 9.99,
  "features": [
    "100 API calls/day",
    "Market prices (delayed)",
    "Basic weather data"
  ]
}
```

**404 Not Found:**

```json
{
  "statusCode": 404,
  "message": "Plan not found"
}
```

---

## Create Plan

<span class="badge--post">POST</span> `/api/v1/plans`

Creates a new subscription plan.

:::note Admin Endpoint
This endpoint is typically restricted to admin users. Contact the platform team for access.
:::

### Request

**Headers:**

| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | ✅ |

**Body Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | ✅ | Display name of the plan |
| `price` | `number` | ✅ | Monthly price in the platform currency |
| `description` | `string` | ❌ | Short description of the plan |

**Example:**

```bash
curl -X POST https://api.agri-content.com/api/v1/plans \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pro Plan",
    "price": 29.99,
    "description": "Access to all pro features"
  }'
```

### Response

**201 Created:**

```json
{
  "id": "p4d5e6f7-a8b9-0123-defa-345678901234",
  "name": "Pro Plan",
  "price": 29.99
}
```

---

## Plan Comparison

Here's a typical plan structure to help users choose the right tier:

| Feature | Basic | Pro | Enterprise |
|---|:---:|:---:|:---:|
| API Calls / Day | 100 | 5,000 | Unlimited |
| Market Prices | Delayed | Real-time | Real-time |
| Weather Data | Basic | Advanced | Advanced + Alerts |
| Agronomic Advice | — | ✅ | Custom |
| Webhook Support | — | — | ✅ |
| Priority Support | — | — | ✅ |
| **Price** | **$9.99/mo** | **$29.99/mo** | **$99.99/mo** |
