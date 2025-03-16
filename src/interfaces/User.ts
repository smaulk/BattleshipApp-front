import { AxiosResponse } from "axios";

export interface CreateUser {
  nickname: string,
  email: string,
  password: string,
  passwordConfirmation: string
}

export interface SelfUser {
  id: number,
  nickname: string,
  email: string,
  isVerified: boolean,
  avatarUrl: string,
}

export type AxiosCreateUser = AxiosResponse<SelfUser>;