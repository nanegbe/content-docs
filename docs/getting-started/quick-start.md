---
sidebar_position: 2
title: Quick Start
description: Make your first E-Content API call in under 5 minutes.
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiResponse from '@site/src/components/ApiResponse';

# Quick Start

Get up and running with the E-Content API in under 5 minutes. This guide walks you through registration, authentication, and making your first API call.

## Prerequisites

- [cURL](https://curl.se/) or any HTTP client (e.g., Postman, Insomnia)
- A valid email address for registration

## Step 1 — Register an Account

Create a new account by sending a `POST` request to the registration endpoint:

<ApiCodeToggler
  method="POST"
  endpoint="/auth/register"
  body={{
    email: "developer@example.com",
    password: "securepassword",
    firstName: "Jane",
    lastName: "Doe",
    msisdn: "+233241234567",
    userCountry: "GH",
    industry: "Agriculture",
    organizationCountry: "GH",
    organizationName: "FarmTech Solutions",
    preferences: {
      language: "en"
    }
  }}
  showAuth={false}
  label="REGISTER"
/>

<ApiResponse
  title="201 Created"
  data={{
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    email: "developer@example.com",
    firstName: "Jane",
    lastName: "Doe"
  }}
/>

## Step 2 — Log In

Authenticate with your credentials to receive a JWT access token:

<ApiCodeToggler
  method="POST"
  endpoint="/auth/login"
  body={{
    email: "developer@example.com",
    password: "securepassword"
  }}
  showAuth={false}
  label="LOGIN"
/>

<ApiResponse
  title="200 OK"
  data={{
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    user: {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      email: "developer@example.com"
    }
  }}
/>

:::tip Save Your Token
Store the `accessToken` — you'll need it for all authenticated requests. JWT tokens expire after a set period; use the login endpoint to obtain a new one.
:::

## Step 3 — Generate an API Key

For server-to-server integrations, create a persistent API key:

<ApiCodeToggler
  method="POST"
  endpoint="/api-key"
  body={{
    name: "Production Key",
    description: "Used for production integration"
  }}
  label="CREATE API KEY"
/>

<ApiResponse
  title="201 Created"
  data={{
    id: "key-uuid",
    key: "sk_live_xxxxxxxxxxxxxx",
    name: "Production Key",
    createdAt: "2026-03-16T00:00:00.000Z"
  }}
/>

:::caution Store Your API Key Securely
The full API key is only shown **once** at creation time. Store it securely — you won't be able to retrieve it again.
:::

## Step 4 — Fetch Commodities

Now use your API key to query commodity market prices:

<ApiCodeToggler
  method="GET"
  endpoint="/dev/commodities"
  token="sk_live_xxxxxxxxxxxxxx"
  label="GET COMMODITIES"
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
      id: "d4e5f6a7-b8c9-0123-def4-56789abcdef0",
      name: "Rice",
      unit: "kg",
      price: 680.00
    }
  ]}
/>

## Step 5 — Check API Health

Verify the API is running with the health check endpoint (no auth required):

<ApiCodeToggler
  method="GET"
  endpoint="/health"
  showAuth={false}
  label="HEALTH CHECK"
/>

<ApiResponse
  title="200 OK"
  data={{
    status: "ok",
    health: "running"
  }}
/>

---

## What's Next?

You've successfully registered, authenticated, and made your first API call! Here's where to go from here:

- **[Authentication Guide →](../api/authentication)** — Deep dive into JWT tokens and API keys
- **[Plans & Payments →](../api/plans)** — Set up subscription plans for your users
- **[Webhooks →](../api/webhooks)** — Receive real-time payment notifications
- **[Full API Reference →](../api/authentication)** — Explore every endpoint in detail
