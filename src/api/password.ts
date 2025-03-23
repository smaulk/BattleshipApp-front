import { handleApiResponse } from "@/api/response.ts";
import { request } from "@/axios.config.ts";
import { ResetPassword, UpdatePassword } from "@/interfaces/Password.ts";
import { AxiosNoContent } from "@/interfaces/AxiosResponse.ts";

export async function apiUpdatePassword(data: UpdatePassword): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.post(`/api/v1/users/me/password`, data));
}

export async function apiForgotPassword(email: string): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.post('/api/v1/password/forgot', { email }));
}

export async function apiResetPassword(data: ResetPassword): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.post('/api/v1/password/reset', data));
}