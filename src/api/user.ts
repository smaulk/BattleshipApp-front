import { AxiosPaginateUsers, AxiosSelfUser, AxiosUser, CreateUserData, UpdateUserData } from "@/interfaces/User.ts";
import { handleApiResponse } from "@/api/response.ts";
import { request } from "@/axios.config.ts";
import { AxiosNoContent } from "@/interfaces/AxiosResponse.ts";
import { PaginateUsersParams } from "@/interfaces/Paginate.ts";

export async function apiCreateUser(userData: CreateUserData): Promise<AxiosSelfUser> {
  return handleApiResponse<AxiosSelfUser>(request.post('/api/v1/users', userData));
}

export async function apiUpdateUser(userData: UpdateUserData): Promise<AxiosSelfUser> {
  return handleApiResponse<AxiosSelfUser>(request.put('/api/v1/users/me', userData));
}

export async function apiUpdateAvatar(avatar: File): Promise<AxiosNoContent> {
  const formData = new FormData();
  formData.append('avatar', avatar);
  formData.append('_method', 'PUT');

  return handleApiResponse<AxiosNoContent>(request
    .post('/api/v1/users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }));
}

export async function apiDeleteAvatar(): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.delete('/api/v1/users/me/avatar'));
}

export async function apiGetUsers(data: PaginateUsersParams): Promise<AxiosPaginateUsers> {
  return handleApiResponse<AxiosPaginateUsers>(request.get('/api/v1/users/', {params: data }));
}

export async function apiGetUser(id: number): Promise<AxiosUser | AxiosSelfUser> {
  return handleApiResponse<AxiosUser | AxiosSelfUser>(request.get(`/api/v1/users/${id}`));
}