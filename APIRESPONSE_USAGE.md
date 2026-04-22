# ApiResponse Component Usage Guide

## Overview

The `ApiResponse` component provides a uniform, professional way to display API responses, request bodies, environment variables, and other code blocks throughout your documentation. It uses the same terminal-style design as ApiCodeToggler with syntax highlighting.

## Features

✅ **Copy to clipboard** - One-click copy functionality  
✅ **Syntax highlighting** - Automatic JSON/code highlighting  
✅ **Line numbers** - Professional terminal-style display  
✅ **Consistent styling** - Matches the ApiCodeToggler design perfectly  
✅ **Simple API** - Just pass your data object and title  

---

## Import

```mdx
import ApiResponse from '@site/src/components/ApiResponse';
```

---

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | ❌ | `'RESPONSE'` | Display title for the code block |
| `data` | `object` \| `array` \| `string` | ✅ | - | The content to display (auto-formatted if object/array) |
| `language` | `TerminalLanguage` | ❌ | `'json'` | Syntax highlighting language (`'curl'`, `'python'`, `'node'`, `'php'`, `'bash'`) |

---

## Usage Examples

### 1. JSON Response

```mdx
<ApiResponse
  title="200 OK"
  data={{
    id: "user-123",
    email: "user@example.com",
    name: "John Doe"
  }}
/>
```

### 2. Error Response

```mdx
<ApiResponse
  title="404 Not Found"
  data={{
    statusCode: 404,
    message: "User not found"
  }}
/>
```

### 3. Array Response

```mdx
<ApiResponse
  title="Commodities List"
  data={[
    { id: "1", name: "Maize", price: 450 },
    { id: "2", name: "Rice", price: 680 }
  ]}
/>
```

### 4. Environment Variables (String)

```mdx
<ApiResponse
  title=".env"
  data={`AGRI_CONTENT_API_KEY=sk_live_xxxxx
AGRI_CONTENT_BASE_URL=https://api.e-Content.com/api/v1`}
/>
```

### 5. Request Body

```mdx
<ApiResponse
  title="Request Body"
  data={{
    email: "user@example.com",
    password: "securepassword",
    firstName: "John",
    lastName: "Doe"
  }}
/>
```

### 6. cURL Example

```mdx
<ApiResponse
  title="cURL Request"
  language="bash"
  data={`curl -X GET https://api.e-Content.com/api/v1/health`}
/>
```

---

## Supported Languages

| Language | Use Case |
|----------|----------|
| `json` | JSON responses and request bodies (default) |
| `bash` | Shell commands, cURL examples |
| `curl` | cURL-specific highlighting |
| `python` | Python code examples |
| `node` | Node.js/JavaScript code examples |
| `php` | PHP code examples |

---

## Best Practices

1. **Use descriptive titles** - Include HTTP status codes (e.g., `"200 OK"`, `"404 Not Found"`)
2. **Keep data objects clean** - The component auto-formats JSON with proper indentation
3. **Use string data** for non-JSON content like environment variables or shell commands
4. **Specify language** when not using JSON for proper syntax highlighting
5. **Pair with ApiCodeToggler** for complete API endpoint documentation

---

## Complete Example with ApiCodeToggler

```mdx
import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiResponse from '@site/src/components/ApiResponse';

## Get User

<ApiCodeToggler
  method="GET"
  endpoint="/users/123"
  token="YOUR_API_KEY"
  label="GET USER"
/>

### Response

**200 OK** — User found:

<ApiResponse
  title="200 OK"
  data={{
    id: "user-123",
    email: "user@example.com",
    name: "John Doe"
  }}
/>

**404 Not Found** — User doesn't exist:

<ApiResponse
  title="404 Not Found"
  data={{
    statusCode: 404,
    message: "User not found"
  }}
/>
```

---

## Migration from Markdown Code Blocks

**Before:**
````markdown
```json
{
  "id": "user-123",
  "email": "user@example.com"
}
```
````

**After:**
```mdx
<ApiResponse
  title="200 OK"
  data={{
    id: "user-123",
    email: "user@example.com"
  }}
/>
```

---

## Notes

- The component automatically formats objects and arrays with 2-space indentation
- Copy button shows visual feedback for 1.5 seconds
- Responsive design works on all screen sizes
- Dark theme optimized for readability
- Uses the same styling as ApiCodeToggler for consistency
