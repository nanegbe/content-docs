---
sidebar_position: 5
title: API Keys
description: API reference for creating and managing API keys for programmatic access.
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiResponse from '@site/src/components/ApiResponse';

# API Keys

Generate and manage API keys for server-to-server and programmatic access to the E-Content API.

**Base URL:** `https://api.e-Content.com/api/v1/api-key`

---

## Overview

API keys provide long-lived credentials for automated integrations. Unlike JWT tokens (which expire after a session), API keys remain valid until they are revoked — making them ideal for:

- Backend services consuming market price data
- Scheduled jobs fetching weather updates
- CI/CD pipelines running integration tests
- Third-party platform integrations

:::info Authentication Required
You must be authenticated with a valid JWT token to create an API key. Once created, the API key can be used independently of JWT tokens.
:::

---

## Create API Key

<span class="badge--post">POST</span> `/api/v1/api-key`

Generates a new API key for the authenticated user.

### Request

**Headers:**

| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | ✅ |
| `Authorization` | `Bearer <jwt-token>` | ✅ |

**Body Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | ✅ | A descriptive name for the key (e.g., `"Production Server"`) |
| `description` | `string` | ❌ | Additional context about the key's intended use |

**Example:**

<ApiCodeToggler
  method="POST"
  endpoint="/api-key"
  body={{
    name: "Production Server Key",
    description: "Used for production backend integration"
  }}
  label="CREATE API KEY"
/>

### Response

**201 Created:**

<ApiResponse
  title="201 Created"
  data={{
    id: "k1a2b3c4-d5e6-7890-abcd-ef1234567890",
    key: "sk_live_xxxxxxxxxxxxxx",
    name: "Production Server Key",
    createdAt: "2026-03-16T00:00:00.000Z"
  }}
/>

### Response Fields

| Field | Type | Description |
|---|---|---|
| `id` | `string` (UUID) | Unique identifier for the key record |
| `key` | `string` | The actual API key value — **shown only once** |
| `name` | `string` | The name you assigned to the key |
| `createdAt` | `string` (ISO 8601) | Timestamp of when the key was created |

:::caution Store Your Key Immediately
The `key` field containing the full API key value is returned **only once** at creation time. It is not stored in plain text and cannot be retrieved later. Copy it immediately and store it securely.
:::

---

## Using API Keys

Once you have an API key, include it in the `Authorization` header of your requests:

<ApiCodeToggler
  method="GET"
  endpoint="/dev/commodities"
  token="sk_live_xxxxxxxxxxxxxx"
  label="USE API KEY"
/>

### Environment Variable Setup

Store your API key in environment variables — never hardcode secrets:

<ApiResponse
  title=".env"
  language="bash"
  data={`AGRI_CONTENT_API_KEY=sk_live_xxxxxxxxxxxxxx
AGRI_CONTENT_BASE_URL=https://api.e-Content.com/api/v1`}
/>

<ApiResponse
  title="api-client.js"
  language="node"
  data={`const API_KEY = process.env.AGRI_CONTENT_API_KEY;
const BASE_URL = process.env.AGRI_CONTENT_BASE_URL;

async function getCommodities() {
  const response = await fetch(\\\`\\\${BASE_URL}/dev/commodities\\\`, {
    headers: {
      'Authorization': \\\`Bearer \\\${API_KEY}\\\`,
    },
  });

  return response.json();
}`}
/>

<ApiResponse
  title="api_client.py"
  language="python"
  data={`import os
import requests

API_KEY = os.environ["AGRI_CONTENT_API_KEY"]
BASE_URL = os.environ["AGRI_CONTENT_BASE_URL"]

def get_commodities():
    response = requests.get(
        f"{BASE_URL}/dev/commodities",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    return response.json()`}
/>

---

## Key Management Best Practices

| Practice | Description |
|---|---|
| 🏷️ **Use descriptive names** | Name keys after their purpose: `"Production Backend"`, `"Staging Tests"`, `"SMS Service"` |
| 🔄 **Rotate regularly** | Create new keys and deprecate old ones on a regular schedule |
| 🎯 **One key per service** | Don't share a single key across multiple applications |
| 🗄️ **Use environment variables** | Store keys using `.env` files or your platform's secrets manager |
| 🚫 **Never commit to Git** | Add `.env` to `.gitignore` and use secrets management in CI/CD |
| 📊 **Monitor usage** | Track API key usage to detect anomalies or unauthorized access |

---

## Related

- **[Authentication Guide →](./authentication)** — Full authentication overview
- **[Commodities →](../market-price/commodities)** — Query commodity data using your API key
