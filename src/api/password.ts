import { handleApiResponse } from "@/api/response.ts";
import { request } from "@/axios.config.ts";
import { ResetPasswordData, UpdatePasswordData } from "@/interfaces/Password.ts";
import { AxiosNoContent } from "@/interfaces/AxiosResponse.ts";

export async function apiUpdatePassword(data: UpdatePasswordData): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.put(`/api/v1/users/me/password`, data));
}

export async function apiForgotPassword(email: string): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.post('/api/v1/password/forgot', { email }));
}

export async function apiResetPassword(data: ResetPasswordData): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.post('/api/v1/password/reset', data));
}