import { AxiosResponse } from "axios";
import { handleApiResponse } from "@/api/response.ts";
import { request } from "@/axios.config.ts";

export async function apiCreateInvite(friendId: number): Promise<AxiosResponse<void>> {
  return handleApiResponse<AxiosResponse<void>>(request.post('/api/v1/invites', { friendId }));
}

export async function apiAcceptInvite(friendId: number): Promise<AxiosResponse<void>> {
  return handleApiResponse<AxiosResponse<void>>(request.put(`/api/v1/invites/${friendId}`));
}

export async function apiDeleteInvite(friendId: number): Promise<AxiosResponse<void>> {
  return handleApiResponse<AxiosResponse<void>>(request.delete(`/api/v1/invites/${friendId}`));
}