---
sidebar_position: 5
title: API Keys
description: API reference for creating and managing API keys for programmatic access.
---

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

```bash
curl -X POST https://api.e-Content.com/api/v1/api-key \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "Production Server Key",
    "description": "Used for production backend integration"
  }'
```

### Response

**201 Created:**

```json
{
  "id": "k1a2b3c4-d5e6-7890-abcd-ef1234567890",
  "key": "sk_live_xxxxxxxxxxxxxx",
  "name": "Production Server Key",
  "createdAt": "2026-03-16T00:00:00.000Z"
}
```

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

```bash
curl -X GET https://api.e-Content.com/api/v1/dev/commodities \
  -H "Authorization: Bearer sk_live_xxxxxxxxxxxxxx"
```

### Environment Variable Setup

Store your API key in environment variables — never hardcode secrets:

```bash title=".env"
AGRI_CONTENT_API_KEY=sk_live_xxxxxxxxxxxxxx
AGRI_CONTENT_BASE_URL=https://api.e-Content.com/api/v1
```

```javascript title="api-client.js"
const API_KEY = process.env.AGRI_CONTENT_API_KEY;
const BASE_URL = process.env.AGRI_CONTENT_BASE_URL;

async function getCommodities() {
  const response = await fetch(`${BASE_URL}/dev/commodities`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    },
  });

  return response.json();
}
```

```python title="api_client.py"
import os
import requests

API_KEY = os.environ["AGRI_CONTENT_API_KEY"]
BASE_URL = os.environ["AGRI_CONTENT_BASE_URL"]

def get_commodities():
    response = requests.get(
        f"{BASE_URL}/dev/commodities",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    return response.json()
```

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

- **[Authentication Guide →](../getting-started/authentication)** — Full authentication overview
- **[Commodities →](./commodities)** — Query commodity data using your API key
