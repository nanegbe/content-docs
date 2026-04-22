---
sidebar_position: 1
title: Authentication
description: API reference for authentication endpoints — login, register, and session validation.
---

# Authentication

Manage user authentication, registration, and session validation.

**Base URL:** `https://api.agri-content.com/api/v1/auth`

---

## Register

<span class="badge--post">POST</span> `/api/v1/auth/register`

Creates a new user account with complete profile information.

### Request

**Headers:**

| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | ✅ |

**Body Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `email` | `string` | ✅ | User's email address |
| `password` | `string` | ✅ | Account password |
| `firstName` | `string` | ✅ | User's first name |
| `lastName` | `string` | ✅ | User's last name |
| `msisdn` | `string` | ✅ | Phone number in international format (e.g., `+233241234567`) |
| `userCountry` | `string` | ✅ | User's country code (ISO 3166-1 alpha-2) |
| `industry` | `string` | ✅ | User's industry sector |
| `organizationCountry` | `string` | ✅ | Organization's country code |
| `organizationName` | `string` | ✅ | Name of the organization |
| `preferences` | `object` | ❌ | User preferences |
| `preferences.language` | `string` | ❌ | Preferred language code (e.g., `en`, `fr`) |

**Example:**

```bash
curl -X POST https://api.agri-content.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "securepassword",
    "firstName": "John",
    "lastName": "Doe",
    "msisdn": "+233241234567",
    "userCountry": "GH",
    "industry": "Agriculture",
    "organizationCountry": "GH",
    "organizationName": "Example Corp",
    "preferences": {
      "language": "en"
    }
  }'
```

### Responses

**201 Created** — User successfully registered:

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "email": "newuser@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

**409 Conflict** — Email already in use:

```json
{
  "statusCode": 409,
  "message": "Email already in use"
}
```

---

## Login

<span class="badge--post">POST</span> `/api/v1/auth/login`

Authenticates a user with email and password. Returns a JWT access token on success.

### Request

**Headers:**

| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | ✅ |

**Body Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `email` | `string` | ✅ | Registered email address |
| `password` | `string` | ✅ | Account password |

**Example:**

```bash
curl -X POST https://api.agri-content.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "yourpassword"
  }'
```

### Responses

**200 OK** — Login successful:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "user@example.com"
  }
}
```

**401 Unauthorized** — Invalid credentials:

```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

---

## Authenticate User

<span class="badge--post">POST</span> `/api/v1/auth/authenticate-user`

Validates an existing user session. Use this to verify that a stored JWT token is still valid.

### Request

**Headers:**

| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | ✅ |
| `Authorization` | `Bearer <token>` | ✅ |

**Example:**

```bash
curl -X POST https://api.agri-content.com/api/v1/auth/authenticate-user \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Responses

**200 OK** — Token is valid:

```json
{
  "authenticated": true,
  "user": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "user@example.com"
  }
}
```

**401 Unauthorized** — Token is missing or invalid:

```json
{
  "statusCode": 401,
  "message": "Missing or invalid Authorization header"
}
```

:::tip
Use this endpoint in your application's startup flow to check if a cached token is still valid before redirecting the user to login.
:::
