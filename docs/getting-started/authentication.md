---
sidebar_position: 3
title: Authentication Guide
description: Learn how to authenticate with the Agri-Content API using JWT tokens and API keys.
---

# Authentication Guide

The Agri-Content API uses two authentication methods depending on your use case. This guide covers both approaches in detail.

## Authentication Methods Overview

| Method | Best For | Lifetime | Header Format |
|---|---|---|---|
| **JWT Token** | Web/mobile apps, user sessions | Short-lived (hours) | `Authorization: Bearer <jwt-token>` |
| **API Key** | Server-to-server, background jobs, CI/CD | Long-lived (until revoked) | `Authorization: Bearer <api-key>` |

---

## JWT Authentication

JWT (JSON Web Token) authentication is ideal for interactive user sessions where a user logs in through your application.

### How it works

```
1. User submits email + password
2. Server validates credentials
3. Server returns a signed JWT access token
4. Client includes token in subsequent requests
5. Token expires → user must re-authenticate
```

### Login

<span class="badge--post">POST</span> `/api/v1/auth/login`

Authenticate a user and receive a JWT token.

**Request:**

```bash
curl -X POST https://api.agri-content.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "yourpassword"
  }'
```

**Response — 200 OK:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "user@example.com"
  }
}
```

**Error — 401 Unauthorized:**

```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

### Validate Session

<span class="badge--post">POST</span> `/api/v1/auth/authenticate-user`

Verify the current token is valid and retrieve the authenticated user's profile.

**Request:**

```bash
curl -X POST https://api.agri-content.com/api/v1/auth/authenticate-user \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response — 200 OK:**

```json
{
  "authenticated": true,
  "user": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "user@example.com"
  }
}
```

**Error — 401 Unauthorized:**

```json
{
  "statusCode": 401,
  "message": "Missing or invalid Authorization header"
}
```

:::tip Token Validation
Use this endpoint to check if a stored token is still valid before making other API calls. This is useful for mobile apps that cache tokens locally.
:::

---

## API Key Authentication

API keys provide long-lived credentials for server-to-server integrations where interactive login isn't practical.

### Create an API Key

<span class="badge--post">POST</span> `/api/v1/api-key`

Generate a new API key. Requires JWT authentication.

**Request:**

```bash
curl -X POST https://api.agri-content.com/api/v1/api-key \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Production Server Key",
    "description": "Used for production backend integration"
  }'
```

**Response — 201 Created:**

```json
{
  "id": "key-uuid",
  "key": "sk_live_xxxxxxxxxxxxxx",
  "name": "Production Server Key",
  "createdAt": "2026-03-16T00:00:00.000Z"
}
```

:::caution Important
The `key` value is displayed **only once** at creation. Copy and store it in a secure location (e.g., environment variables, secrets manager). You will not be able to retrieve the full key again.
:::

### Using Your API Key

Once created, use your API key in the `Authorization` header for all subsequent requests:

```bash
curl -X GET https://api.agri-content.com/api/v1/dev/commodities \
  -H "Authorization: Bearer sk_live_xxxxxxxxxxxxxx"
```

---

## Security Best Practices

Follow these guidelines to keep your integration secure:

| Practice | Description |
|---|---|
| 🔒 **Use HTTPS** | Always use HTTPS in production. Never send tokens over unencrypted connections. |
| 🗄️ **Store secrets securely** | Use environment variables or a secrets manager — never hardcode tokens in source code. |
| 🔄 **Rotate API keys** | Periodically generate new API keys and revoke old ones. |
| 🎯 **Principle of least privilege** | Create separate API keys for different services with descriptive names. |
| ⏱️ **Handle expiration** | Implement automatic re-authentication when JWT tokens expire (HTTP 401). |
| 🚫 **Never expose in clients** | API keys should only be used server-side. For browser/mobile apps, use JWT tokens. |

### Example: Handling Token Expiration

```javascript title="token-refresh.js"
async function apiRequest(url, options = {}) {
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${getStoredToken()}`,
    },
  });

  // If token expired, re-authenticate and retry
  if (response.status === 401) {
    const newToken = await refreshToken();
    storeToken(newToken);

    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${newToken}`,
      },
    });
  }

  return response.json();
}
```

---

## Next Steps

- **[Plans & Payments →](../api/plans)** — Subscribe to a plan and start accessing data
- **[Commodities →](../api/commodities)** — Query market price data
- **[API Reference →](../api/authentication)** — Full endpoint documentation
