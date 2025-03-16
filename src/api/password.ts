import { AxiosResponse } from "axios";
import { handleApiResponse } from "@/api/response.ts";
import { request } from "@/axios.config.ts";

export async function apiForgotPassword(email: string): Promise<AxiosResponse<void>> {
  return handleApiResponse<AxiosResponse<void>>(request.post('/api/v1/password/forgot', { email }));
}