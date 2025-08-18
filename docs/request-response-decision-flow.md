# Request & Response Handling

## Request Flow

**Is it a GET request (fetch data)?**

- Yes → Use **API Route**
- No → Continue below

**Is it triggered by Form Submit or UI Button (delete/save)?**

- Yes → Use **Server Action** (`POST`, `PATCH`, `PUT`, `DELETE`)
- No → Use **API Route**

**Extra Rule**

- If using **Server Action** but need reusable logic →  
  Call **API Route** inside the Server Action

## Error Flow

**If GET request**

- Show **inline error message** (e.g., “Something went wrong”)
- Provide an **optional Retry button**

**If POST / Form Submit**

- Show **error inside the form**
- If async/late → show a **toast notification**

**If PATCH / PUT / DELETE**

- Show a **toast notification**
- Optional: Redirect if required

## Success Flow

**If GET request**

- Silent: Update UI without extra messages

**If POST / Form Submit**

- Show **inline success message** or **toast notification**
- Optional: Redirect after completion

**If PATCH / PUT / DELETE**

- Show **success toast notification**
- Optional: Redirect after completion

### Online chart

You can [see the online chart here](https://excalidraw.com/#json=fPhb7y7GZohHdUp6Ak_Qr,x6rsZtl1MYGKhDS3nmRC_A).

⚠️ Note it might erase your existing charts on excalidraw.
