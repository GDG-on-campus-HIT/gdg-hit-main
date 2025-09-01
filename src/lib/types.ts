// Form-related TypeScript interfaces

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

export interface FormResponse {
  success: boolean;
  data: Form | Form[];
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}
