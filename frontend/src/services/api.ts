import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ContactRequest {
  name: string;
  email: string;
  company: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  id: string;
  createdAt: string;
}

export interface BookDemoRequest {
  name: string;
  email: string;
  company: string;
  preferredDate: string;
  notes?: string;
}

export interface BookDemoResponse {
  success: boolean;
  id: string;
  scheduledAt: string;
}

export const submitContact = async (data: ContactRequest): Promise<ContactResponse> => {
  const response = await apiClient.post<ContactResponse>('/api/contact', data);
  return response.data;
};

export const submitBookDemo = async (data: BookDemoRequest): Promise<BookDemoResponse> => {
  const response = await apiClient.post<BookDemoResponse>('/api/book-demo', data);
  return response.data;
};

