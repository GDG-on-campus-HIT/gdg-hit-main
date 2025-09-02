# Form API Integration

This document explains how to use the newly integrated Form API endpoints in your GDG HIT application.

## What's Been Added

### 1. TypeScript Types (`src/lib/types.ts`)
- `Form` interface for form data structure
- `CreateFormRequest` interface for creating new forms
- `UpdateFormRequest` interface for updating existing forms
- `FormResponse` interface for API responses
- `ApiError` interface for error handling

### 2. Enhanced API Functions (`src/lib/api.ts`)
- `fetchForms()` - Get all forms
- `fetchFormByID(id)` - Get a single form by ID
- `createForm(data)` - Create a new form
- `updateForm(id, data)` - Update an existing form
- `deleteForm(id)` - Delete a form
- `toggleFormStatus(id)` - Toggle form active status

### 3. Form Management Component (`src/components/FormManagement.tsx`)
- Complete CRUD operations for forms
- Create, read, update, delete forms
- Toggle form status (active/inactive)
- Modal-based forms for create/edit operations
- Real-time form list updates

### 4. API Documentation (`API_DOCUMENTATION.md`)
- Complete API endpoint documentation
- Request/response examples
- Error handling information
- Frontend integration examples

## How to Use

### Basic API Usage

```typescript
import { 
  fetchForms, 
  createForm, 
  updateForm, 
  deleteForm, 
  toggleFormStatus 
} from '@/lib/api';

// Get all forms
const forms = await fetchForms();

// Create a new form
const newForm = await createForm({
  eventId: 'event_123',
  formTitle: 'Workshop Registration',
  description: 'Registration form for the workshop',
  includePayment: true
});

// Update a form
const updatedForm = await updateForm('form_123', {
  formTitle: 'Updated Title',
  description: 'Updated description'
});

// Delete a form
await deleteForm('form_123');

// Toggle form status
const toggledForm = await toggleFormStatus('form_123');
```

### Using the Form Management Component

```tsx
import FormManagement from '@/components/FormManagement';

// In your page or component
<FormManagement />
```

This component provides a complete interface for managing forms with:
- List view of all forms
- Create new form functionality
- Edit existing forms
- Delete forms
- Toggle form status

## API Endpoints

The following endpoints are now available:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/forms/get-forms` | Get all forms |
| GET | `/forms/{id}` | Get a single form |
| POST | `/forms/create` | Create a new form |
| PUT | `/forms/{id}` | Update a form |
| DELETE | `/forms/delete/{id}` | Delete a form |
| PATCH | `/forms/{id}/toggle-status` | Toggle form status |

## Environment Configuration

Make sure your `.env.local` file includes:

```env
NEXT_PUBLIC_SERVER_URI=https://your-api-url.com/api/v1
```

If not set, it will default to `http://localhost:8080/api/v1`.

## Error Handling

All API functions include proper error handling:

```typescript
try {
  const forms = await fetchForms();
  // Handle success
} catch (error) {
  console.error('Failed to fetch forms:', error);
  // Handle error (show toast, etc.)
}
```

## Type Safety

The API is fully typed with TypeScript:

```typescript
import { Form, CreateFormRequest } from '@/lib/types';

const form: Form = {
  id: 'form_123',
  eventId: 'event_456',
  formTitle: 'Workshop Registration',
  description: 'Registration form for workshop',
  includePayment: true,
  isActive: true,
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:30:00Z'
};
```

## Integration with Existing Code

The new API functions are designed to work alongside your existing code. They use the same base URL configuration and error handling patterns as your existing API functions.

## Next Steps

1. **Test the API endpoints** with your backend
2. **Customize the FormManagement component** to match your UI design
3. **Add form validation** if needed
4. **Integrate with your existing forms** by replacing hardcoded data with API calls
5. **Add loading states and error handling** to your existing components

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your backend API is running and accessible
3. Check the network tab for failed requests
4. Ensure your environment variables are correctly set
