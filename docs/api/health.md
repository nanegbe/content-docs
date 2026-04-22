---
sidebar_position: 7
title: Health Check
description: API reference for checking the Agri-Content API service health status.
---

# Health Check

Monitor the operational status of the Agri-Content API service.

**Base URL:** `https://api.agri-content.com/api/v1/health`

---

## Overview

The health check endpoint provides a simple way to verify that the API server is running and responsive. It requires no authentication and is designed for:

- **Uptime monitoring** — Integrate with tools like UptimeRobot, Pingdom, or Datadog
- **Load balancer health probes** — Use as a target for ALB/NLB health checks
- **Deployment verification** — Confirm successful deployments in CI/CD pipelines
- **Client-side connectivity checks** — Verify network connectivity before making API calls

---

## Health Check

<span class="badge--get">GET</span> `/api/v1/health`

Returns the current health status of the API server. No authentication required.

### Request

**Example:**

```bash
curl -X GET https://api.agri-content.com/api/v1/health
```

### Response

**200 OK** — Service is healthy:

```json
{
  "status": "ok",
  "health": "running"
}
```

### Response Fields

| Field | Type | Description |
|---|---|---|
| `status` | `string` | Overall service status. `"ok"` indicates the service is operational. |
| `health` | `string` | Detailed health state. `"running"` indicates the server is processing requests normally. |

---

## Monitoring Integration

### UptimeRobot / Pingdom

Configure your monitoring tool to:

1. Send a `GET` request to `https://api.agri-content.com/api/v1/health`
2. Expect HTTP status code `200`
3. Optionally verify the response body contains `"status": "ok"`
4. Set check interval to 60 seconds (recommended)

### Docker / Kubernetes

Use the health endpoint in container orchestration:

```yaml title="docker-compose.yml"
services:
  agri-content-api:
    image: agri-content/api:latest
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/v1/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

```yaml title="k8s-deployment.yml"
livenessProbe:
  httpGet:
    path: /api/v1/health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 15
readinessProbe:
  httpGet:
    path: /api/v1/health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10
```

### Shell Script

```bash title="health-check.sh"
#!/bin/bash

HEALTH_URL="https://api.agri-content.com/api/v1/health"

response=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_URL")

if [ "$response" = "200" ]; then
  echo "✅ API is healthy"
  exit 0
else
  echo "❌ API is down (HTTP $response)"
  exit 1
fi
```

---

## Related

- **[Introduction →](../getting-started/introduction)** — Overview of the Agri-Content platform
- **[Quick Start →](../getting-started/quick-start)** — Get up and running in 5 minutes
