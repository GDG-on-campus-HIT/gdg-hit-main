# Student Registration Form

## Overview
A dynamic student registration form for GDG HIT that collects student information including personal details, academic information, and contact details.

## Features

### Form Fields
- **Full Name** - Required, minimum 2 characters
- **Department** - Dropdown selection with common engineering branches
- **Roll Number** - Format: YY/BRANCH/XXX (e.g., 24/CSE/001)
- **Batch** - Selection: Batch 1, Batch 2, Batch 3
- **Year** - Selection: 2nd Year, 3rd Year
- **Contact Number** - 10-digit phone number
- **WhatsApp Number** - 10-digit WhatsApp number
- **Email Address** - Valid email format

### Validation
- **Real-time validation** using Yup schema
- **Error messages** displayed below each field
- **Required field indicators** (*)
- **Format validation** for roll number and phone numbers

### UI/UX Features
- **Responsive design** - Works on mobile and desktop
- **Dark/Light theme** support
- **Spotlight effects** and modern styling
- **Loading states** during form submission
- **Success/Error notifications** using toast messages
- **Form reset** after successful submission

## Technical Implementation

### File Structure
```
src/app/(root)/student-form/
└── page.tsx          # Main form component
```

### Dependencies Used
- **Formik** - Form state management
- **Yup** - Form validation
- **Redux Toolkit** - API state management
- **Tailwind CSS** - Styling
- **React Toastify** - Notifications

### API Integration
- **Endpoint**: `/api/v1/student-registration`
- **Method**: POST
- **Data**: All form fields + type identifier

### Navigation
- **Navbar link**: "Student Form" added to main navigation
- **Homepage CTA**: "Student Registration" button in hero section
- **Route**: `/student-form`

## Usage

### For Students
1. Navigate to `/student-form` or click "Student Form" in navigation
2. Fill in all required fields
3. Submit the form
4. Receive confirmation notification

### For Developers
1. Form data is validated client-side using Yup
2. Data is sent to backend via Redux RTK Query
3. Form resets on successful submission
4. Error handling with user-friendly messages

## Customization

### Adding New Fields
1. Add field to `initialValues` in formik config
2. Add validation rules to Yup schema
3. Add form input element with proper styling
4. Update API endpoint if needed

### Modifying Validation
- Edit the `validationSchema` object
- Add custom validation functions
- Modify error messages

### Styling Changes
- Update Tailwind classes in the component
- Modify the gradient and color schemes
- Adjust responsive breakpoints

## Future Enhancements
- **File uploads** for documents
- **Multi-step form** for complex registrations
- **Admin panel** for managing submissions
- **Email confirmations** after registration
- **Integration** with student database systems

## Notes
- Form currently uses the existing contact API endpoint
- Consider creating a dedicated student registration API endpoint
- Add rate limiting to prevent spam submissions
- Implement CAPTCHA for additional security
