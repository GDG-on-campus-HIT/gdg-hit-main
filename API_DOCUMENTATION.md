# Event Form API Endpoints

This document provides a comprehensive overview of the REST API endpoints for managing event registration forms in the GDG HIT application.

---

## Base URL
```
https://your-api-url.com/api/v1
```

---

## 1. Get a Single Form
- **Method:** `GET`  
- **Endpoint:** `/forms/{id}`  
- **Description:** Retrieves a single form by its unique ID.  
- **Parameters:**  
  - `{id}`: The unique identifier of the form.  
- **Response:**
```json
{
  "success": true,
  "data": {
    "id": "form_123",
    "eventId": "event_456",
    "formTitle": "GDG HIT Workshop Registration",
    "description": "Registration form for the upcoming workshop",
    "includePayment": true,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Form retrieved successfully"
}
```

---

## 2. Create a New Form
- **Method:** `POST`  
- **Endpoint:** `/forms/create`  
- **Description:** Creates a new event registration form.  
- **Request Body (JSON):**
```json
{
  "eventId": "event_456",
  "formTitle": "GDG HIT Workshop Registration",
  "description": "Registration form for the upcoming workshop",
  "includePayment": true
}
```
- **Response:**
```json
{
  "success": true,
  "data": {
    "id": "form_123",
    "eventId": "event_456",
    "formTitle": "GDG HIT Workshop Registration",
    "description": "Registration form for the upcoming workshop",
    "includePayment": true,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Form created successfully"
}
```

---

## 3. Get All Forms
- **Method:** `GET`  
- **Endpoint:** `/forms/get-forms`  
- **Description:** Retrieves a list of all existing forms.  
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "form_123",
      "eventId": "event_456",
      "formTitle": "GDG HIT Workshop Registration",
      "description": "Registration form for the upcoming workshop",
      "includePayment": true,
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": "form_124",
      "eventId": "event_457",
      "formTitle": "GDG HIT Hackathon Registration",
      "description": "Registration form for the hackathon event",
      "includePayment": false,
      "isActive": false,
      "createdAt": "2024-01-16T09:00:00Z",
      "updatedAt": "2024-01-16T09:00:00Z"
    }
  ],
  "message": "Forms retrieved successfully"
}
```

---

## 4. Update an Existing Form
- **Method:** `PUT`  
- **Endpoint:** `/forms/{id}`  
- **Description:** Updates an existing form by its ID.  
- **Parameters:**  
  - `{id}`: The unique identifier of the form.  
- **Request Body (JSON):**
```json
{
  "formTitle": "Updated Workshop Registration",
  "description": "Updated description for the workshop",
  "includePayment": false
}
```
> **Note:** All fields are optional for an update.  
- **Response:**
```json
{
  "success": true,
  "data": {
    "id": "form_123",
    "eventId": "event_456",
    "formTitle": "Updated Workshop Registration",
    "description": "Updated description for the workshop",
    "includePayment": false,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-16T14:30:00Z"
  },
  "message": "Form updated successfully"
}
```

---

## 5. Delete a Form
- **Method:** `DELETE`  
- **Endpoint:** `/forms/delete/{id}`  
- **Description:** Deletes a form by its unique ID.  
- **Parameters:**  
  - `{id}`: The unique identifier of the form.  
- **Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Form deleted successfully"
}
```

---

## 6. Toggle Form Status
- **Method:** `PATCH`  
- **Endpoint:** `/forms/{id}/toggle-status`  
- **Description:** Toggles the `isActive` status of a form.  
- **Parameters:**  
  - `{id}`: The unique identifier of the form.  
- **Response:**
```json
{
  "success": true,
  "data": {
    "id": "form_123",
    "eventId": "event_456",
    "formTitle": "GDG HIT Workshop Registration",
    "description": "Registration form for the upcoming workshop",
    "includePayment": true,
    "isActive": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-16T15:00:00Z"
  },
  "message": "Form status toggled successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "formTitle": ["Form title is required"],
    "eventId": ["Event ID is required"]
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Form not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Frontend Integration

### TypeScript Interfaces
```typescript
export interface Form {
  id: string;
  eventId: string;
  formTitle: string;
  description: string;
  includePayment: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFormRequest {
  eventId: string;
  formTitle: string;
  description: string;
  includePayment: boolean;
}

export interface UpdateFormRequest {
  formTitle?: string;
  description?: string;
  includePayment?: boolean;
}
```

### API Functions Usage
```typescript
import { 
  fetchForms, 
  fetchFormByID, 
  createForm, 
  updateForm, 
  deleteForm, 
  toggleFormStatus 
} from '@/lib/api';

// Get all forms
const forms = await fetchForms();

// Get single form
const form = await fetchFormByID('form_123');

// Create new form
const newForm = await createForm({
  eventId: 'event_456',
  formTitle: 'Workshop Registration',
  description: 'Registration form for workshop',
  includePayment: true
});

// Update form
const updatedForm = await updateForm('form_123', {
  formTitle: 'Updated Title'
});

// Delete form
const deleted = await deleteForm('form_123');

// Toggle status
const toggledForm = await toggleFormStatus('form_123');
```

---

## Notes
- All endpoints return responses in a consistent format with `success`, `data`, and optional `message` fields
- The `isActive` field determines whether a form is currently accepting submissions
- Forms are associated with specific events via the `eventId` field
- The `includePayment` field indicates whether the form requires payment processing
- All timestamps are in ISO 8601 format
- Error responses include detailed validation messages when applicable
