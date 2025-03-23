import { handleApiResponse } from "@/api/response.ts";
import { request } from "@/axios.config.ts";
import { AxiosNoContent } from "@/interfaces/AxiosResponse.ts";

export async function apiCreateInvite(friendId: number): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.post('/api/v1/invites', { friendId }));
}

export async function apiAcceptInvite(friendId: number): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.put(`/api/v1/invites/${friendId}`));
}

export async function apiDeleteInvite(friendId: number): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.delete(`/api/v1/invites/${friendId}`));
}