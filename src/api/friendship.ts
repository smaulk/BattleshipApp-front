import { handleApiResponse } from "@/api/response.ts";
import { request } from "@/axios.config.ts";
import { AxiosResponse } from "axios";

export async function apiCreateFriendship(friendId: number): Promise<AxiosResponse<void>> {
  return handleApiResponse<AxiosResponse<void>>(request.post('/api/v1/friendships', { friendId }));
}

export async function apiAcceptFriendship(friendId: number): Promise<AxiosResponse<void>> {
  return handleApiResponse<AxiosResponse<void>>(request.put(`/api/v1/friendships/${friendId}`));
}

export async function apiDeleteFriendship(friendId: number): Promise<AxiosResponse<void>> {
  return handleApiResponse<AxiosResponse<void>>(request.delete(`/api/v1/friendships/${friendId}`));
}