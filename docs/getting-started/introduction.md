---
sidebar_position: 1
title: Introduction
description: Overview of the E-Content API — market prices, weather updates, and agronomic advice for farmers.
---

import ApiResponse from '@site/src/components/ApiResponse';

# Introduction

Welcome to the **E-Content API** — a comprehensive platform that delivers agricultural intelligence to farmers and agribusinesses through a simple, modern REST API.

## What is E-Content?

E-Content is a backend service designed to provide farmers with the data and insights they need to make better decisions. Our API delivers three core pillars of agricultural intelligence:

| Pillar | Description |
|---|---|
| 📊 **Market Prices** | Real-time commodity price data across markets and regions, so farmers know the best time and place to sell. |
| 🌦️ **Weather Updates** | Hyperlocal weather forecasts, seasonal outlooks, and severe weather alerts for farm-level planning. |
| 🌱 **Agronomic Advice** | Crop-specific guidance, pest & disease management, and best practices tailored to local conditions. |

## Who Is This For?

This documentation is built for **developers** integrating E-Content data into their own applications:

- **Mobile app developers** building tools for smallholder farmers
- **Agritech platforms** needing market price feeds and weather data
- **NGOs & government agencies** distributing advisory content at scale
- **SMS/USSD service providers** delivering agricultural alerts

## API Overview

The E-Content API is a RESTful service built with [NestJS](https://nestjs.com/). All endpoints are prefixed with:

```
https://api.e-Content.com/api/v1
```

### Core capabilities

- **Authentication** — JWT-based auth with API key support for programmatic access
- **Plans & Payments** — Subscription management with Paystack payment integration
- **Commodities** — Market price data for agricultural products
- **Webhooks** — Real-time event notifications for payment and system events
- **Health Check** — Service monitoring endpoint

### Authentication methods

The API supports two authentication methods:

| Method | Use Case | Header |
|---|---|---|
| **JWT Token** | Interactive user sessions (web/mobile apps) | `Authorization: Bearer <token>` |
| **API Key** | Server-to-server / programmatic access | `Authorization: Bearer <api-key>` |

## Base URL

| Environment | URL |
|---|---|
| Production | `https://api.e-Content.com/api/v1` |
| Staging | `https://staging-api.e-Content.com/api/v1` |
| Local Development | `http://localhost:3000/api/v1` |

## Response Format

All API responses are returned as JSON. Successful responses contain the resource data directly, while error responses follow a consistent structure:

<ApiResponse
  title="Success Response"
  data={{
    id: "uuid",
    name: "Maize",
    unit: "kg",
    price: 450.00
  }}
/>

<ApiResponse
  title="Error Response"
  data={{
    statusCode: 401,
    message: "Invalid credentials"
  }}
/>

## Rate Limiting

API requests are subject to rate limits based on your subscription plan. Rate limit information is returned in response headers:

| Header | Description |
|---|---|
| `X-RateLimit-Limit` | Maximum requests per window |
| `X-RateLimit-Remaining` | Remaining requests in current window |
| `X-RateLimit-Reset` | Unix timestamp when the window resets |

## Next Steps

Ready to start building? Follow these guides:

1. **[Quick Start →](./quick-start)** — Make your first API call in under 5 minutes
2. **[Authentication →](../api/authentication)** — Set up JWT tokens and API keys
3. **[API Reference →](../api/authentication)** — Explore all available endpoints
