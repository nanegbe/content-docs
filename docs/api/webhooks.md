---
sidebar_position: 4
title: Webhooks
description: API reference for webhook endpoints — receive real-time event notifications from Paystack.
---

# Webhooks

Receive real-time event notifications from third-party services. Currently, the API supports Paystack webhooks for payment event processing.

**Base URL:** `https://api.e-Content.com/api/v1/webhook`

---

## Overview

Webhooks allow external services to notify the E-Content API when events occur (e.g., a payment is completed). Instead of polling for updates, your system receives instant notifications.

### How It Works

```
1. An event occurs in Paystack (e.g., successful payment)
2. Paystack sends an HTTP POST request to your webhook URL
3. The API verifies the request signature
4. The API processes the event (e.g., activates subscription)
5. The API returns 200 OK to acknowledge receipt
```

:::warning Signature Verification
Every incoming webhook request is verified using an HMAC SHA512 signature. Requests with invalid or missing signatures are rejected. **Never skip signature verification** in your own webhook handlers.
:::

---

## Paystack Webhook

<span class="badge--post">POST</span> `/api/v1/webhook/paystack`

Receives and processes webhook events from Paystack such as `charge.success` and `transfer.success`.

### Request

**Headers:**

| Header | Value | Required | Description |
|---|---|---|---|
| `Content-Type` | `application/json` | ✅ | Request body format |
| `x-paystack-signature` | HMAC SHA512 hash | ✅ | HMAC SHA512 of the raw request body, signed with your Paystack secret key |

**Body Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `event` | `string` | Event type (e.g., `charge.success`, `transfer.success`) |
| `data` | `object` | Event payload |
| `data.reference` | `string` | Payment reference from the original transaction |
| `data.amount` | `number` | Amount in the smallest currency unit (e.g., pesewas, kobo) |
| `data.currency` | `string` | Currency code |
| `data.status` | `string` | Transaction status |
| `data.customer` | `object` | Customer information |
| `data.customer.email` | `string` | Customer email address |

**Example Payload:**

```json title="charge.success event"
{
  "event": "charge.success",
  "data": {
    "reference": "pay_ref_abc123def456",
    "amount": 2999,
    "currency": "GHS",
    "status": "success",
    "customer": {
      "email": "user@example.com"
    }
  }
}
```

### Response

**200 OK** — Event received and processed:

```json
{
  "received": true
}
```

---

## Supported Events

| Event | Description | Action Taken |
|---|---|---|
| `charge.success` | A payment was successfully completed | Subscription is activated or renewed |
| `transfer.success` | A transfer was successfully completed | Payout is recorded |
| `charge.failed` | A payment attempt failed | User is notified; subscription remains unchanged |

---

## Signature Verification

Paystack signs every webhook payload using HMAC SHA512 with your secret key. Here's how to verify it:

```javascript title="verify-signature.js"
const crypto = require('crypto');

function verifyPaystackSignature(requestBody, signatureHeader, secretKey) {
  const hash = crypto
    .createHmac('sha512', secretKey)
    .update(JSON.stringify(requestBody))
    .digest('hex');

  return hash === signatureHeader;
}

// Usage in an Express middleware
app.post('/api/v1/webhook/paystack', (req, res) => {
  const signature = req.headers['x-paystack-signature'];

  if (!verifyPaystackSignature(req.body, signature, process.env.PAYSTACK_SECRET)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Process the event
  const { event, data } = req.body;
  console.log(`Received event: ${event}`, data);

  res.status(200).json({ received: true });
});
```

---

## Best Practices

| Practice | Description |
|---|---|
| ✅ **Always verify signatures** | Reject requests that fail HMAC verification to prevent spoofing. |
| ✅ **Return 200 quickly** | Acknowledge receipt immediately and process asynchronously to avoid timeouts. |
| ✅ **Handle duplicates** | Use the `reference` field to deduplicate events — Paystack may retry delivery. |
| ✅ **Log all events** | Store raw webhook payloads for debugging and auditing purposes. |
| ✅ **Use HTTPS** | Your webhook endpoint must use HTTPS in production. |
| ❌ **Don't trust the payload blindly** | Always verify the transaction status via the Paystack Verify Transaction API. |

---

## Testing Webhooks Locally

Use a tunneling tool like [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.me/) to expose your local server for testing:

```bash
# Install ngrok
npm install -g ngrok

# Start your local server
npm run start:dev

# Expose your local webhook endpoint
ngrok http 3000
```

Then configure the ngrok URL (e.g., `https://abc123.ngrok.io/api/v1/webhook/paystack`) as your webhook URL in the Paystack dashboard.

---

## Related

- **[Payments →](./payment)** — Initiate payment transactions
- **[Plans →](./plans)** — View available subscription plans
