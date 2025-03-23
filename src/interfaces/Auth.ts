import { AxiosResponse } from "axios";

export interface PayloadAccessToken {
  id: number,
  nickname: string,
  avatarUrl: string | null,
  exp: number,
}

export interface LoginResponse {
  accessToken: string,
  refreshToken: string,
}

export type AxiosLogin = AxiosResponse<LoginResponse>;
