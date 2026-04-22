---
sidebar_position: 8
title: Database Seeding
description: API reference for seeding the database with initial or test data.
---

# Database Seeding

Seed the database with initial or test data for development and staging environments.

**Base URL:** `https://api.e-Content.com/api/v1/seed`

---

:::danger Production Warning
This endpoint is intended for **development and staging environments only**. Running the seed endpoint in production can overwrite or corrupt live data. Ensure proper environment guards are in place.
:::

---

## Run Seed

<span class="badge--post">POST</span> `/api/v1/seed`

Triggers the database seeding process, populating the database with predefined sample data including commodities, plans, and test users.

### Request

**Headers:**

| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | ✅ |

**Example:**

```bash
curl -X POST http://localhost:3000/api/v1/seed \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Response

**201 Created** — Seeding process initiated:

```json
{
  "message": "Seeding process initiated"
}
```

---

## What Gets Seeded

The seed process creates the following sample data:

| Data Type | Description |
|---|---|
| **Commodities** | Sample agricultural commodities with market prices |
| **Plans** | Default subscription plans (Basic, Pro, Enterprise) |
| **Test Users** | Sample user accounts for integration testing |

---

## When to Use

| Scenario | Recommended |
|---|---|
| Local development setup | ✅ Yes |
| CI/CD test pipeline | ✅ Yes |
| Staging environment reset | ✅ Yes |
| Production environment | ❌ **Never** |

---

## Related

- **[Commodities →](./commodities)** — Query seeded commodity data
- **[Plans →](./plans)** — View seeded subscription plans
