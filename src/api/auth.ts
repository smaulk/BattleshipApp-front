import { request } from "@/axios.config";
import { AxiosLogin } from "@/interfaces/Auth";
import { handleApiResponse } from "@/api/response.ts";

/**
 * Отправляет POST запрос на авторизацию
 */
export async function apiLogin(email: string, password: string): Promise<AxiosLogin> {
  return handleApiResponse<AxiosLogin>(request.post('/api/v1/login', { email, password }));
}

/**
 * Отправляет POST запрос на обновление refresh и access токенов
 */
export async function apiRefresh(refreshToken: string): Promise<AxiosLogin> {
  return handleApiResponse<AxiosLogin>(request.post('/api/v1/refresh', { refreshToken }));
}