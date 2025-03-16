import { AxiosCreateUser, CreateUser } from "@/interfaces/User.ts";
import { handleApiResponse } from "@/api/response.ts";
import { request } from "@/axios.config.ts";

export async function apiCreateUser(userData: CreateUser): Promise<AxiosCreateUser> {
  return handleApiResponse<AxiosCreateUser>(request.post('/api/v1/users', userData));
}

