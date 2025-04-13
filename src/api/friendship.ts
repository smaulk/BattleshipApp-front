import { handleApiResponse } from "@/api/response.ts";
import { request } from "@/axios.config.ts";
import { AxiosNoContent } from "@/interfaces/AxiosResponse.ts";
import { PaginateUsersParams } from "@/interfaces/Paginate.ts";
import { AxiosPaginateUsers } from "@/interfaces/User.ts";

export async function apiCreateFriendship(friendId: number): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.post('/api/v1/friendships', { friendId }));
}

export async function apiAcceptFriendship(friendId: number): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.put(`/api/v1/friendships/${friendId}`));
}

export async function apiDeleteFriendship(friendId: number): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.delete(`/api/v1/friendships/${friendId}`));
}

export async function apiGetFriends(data: PaginateUsersParams): Promise<AxiosPaginateUsers> {
  return handleApiResponse<AxiosPaginateUsers>(request.get('/api/v1/users/me/friends', { params: data }));
}

export async function apiGetOutRequests(data: PaginateUsersParams): Promise<AxiosPaginateUsers> {
  return handleApiResponse<AxiosPaginateUsers>(request.get('/api/v1/users/me/out-requests', { params: data }));
}

export async function apiGetInRequests(data: PaginateUsersParams): Promise<AxiosPaginateUsers> {
  return handleApiResponse<AxiosPaginateUsers>(request.get('/api/v1/users/me/in-requests', { params: data }));
}