// lib/api.ts
import axios from "axios";
import { Form, CreateFormRequest, UpdateFormRequest, FormResponse, ApiError } from "./types";

// Base URL (from env or fallback)
const apiBaseUrl = process.env.NEXT_PUBLIC_SERVER_URI || "http://localhost:8080/api/v1";

// 🔹 Existing function (Event)
export async function fetchEventByID(slug: string) {
  try {
    const response = await axios.get(`${apiBaseUrl}/events/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch event data:", error);
    return null;
  }
}

// =============================
// 🔹 Student Form API Functions
// =============================

// 1. Get all forms
export async function fetchForms(): Promise<Form[]> {
  try {
    const response = await axios.get<FormResponse>(`${apiBaseUrl}/forms/get-forms`);
    return response.data.data as Form[];
  } catch (error) {
    console.error("Failed to fetch forms:", error);
    return [];
  }
}

// 2. Get form by ID
export async function fetchFormByID(id: string): Promise<Form | null> {
  try {
    const response = await axios.get<FormResponse>(`${apiBaseUrl}/forms/${id}`);
    return response.data.data as Form;
  } catch (error) {
    console.error("Failed to fetch form:", error);
    return null;
  }
}

// 3. Create a new form
export async function createForm(data: CreateFormRequest): Promise<Form> {
  try {
    const response = await axios.post<FormResponse>(`${apiBaseUrl}/forms/create`, data);
    return response.data.data as Form;
  } catch (error) {
    console.error("Failed to create form:", error);
    throw error;
  }
}

// 4. Update form
export async function updateForm(id: string, data: UpdateFormRequest): Promise<Form> {
  try {
    const response = await axios.put<FormResponse>(`${apiBaseUrl}/forms/${id}`, data);
    return response.data.data as Form;
  } catch (error) {
    console.error("Failed to update form:", error);
    throw error;
  }
}

// 5. Delete form
export async function deleteForm(id: string): Promise<boolean> {
  try {
    const response = await axios.delete<FormResponse>(`${apiBaseUrl}/forms/delete/${id}`);
    return response.data.success;
  } catch (error) {
    console.error("Failed to delete form:", error);
    throw error;
  }
}

// 6. Toggle form status
export async function toggleFormStatus(id: string): Promise<Form> {
  try {
    const response = await axios.patch<FormResponse>(`${apiBaseUrl}/forms/${id}/toggle-status`);
    return response.data.data as Form;
  } catch (error) {
    console.error("Failed to toggle status:", error);
    throw error;
  }
}
