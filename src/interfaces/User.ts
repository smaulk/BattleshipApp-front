import { AxiosResponse } from "axios";
import { PaginateCollection } from "@/interfaces/Paginate.ts";
import { FriendshipType } from "@/enums/FriendshipType.ts";

export interface CreateUser {
  nickname: string,
  email: string,
  password: string,
  passwordConfirmation: string
}

export interface UpdateUser {
  nickname: string,
  email: string,
}

export interface SelfUser {
  id: number,
  nickname: string,
  email: string,
  isVerified: boolean,
  avatarUrl: string,
}

export interface User {
  id: number,
  nickname: string,
  avatarUrl: string,
  isOnline: boolean,
  friendshipType: FriendshipType | null,
  statistic: Statistic,
}

export interface Statistic {
  games: number,
  wins: number,
  losses: number,
  draws: number,
  points: number,
}


export type AxiosSelfUser = AxiosResponse<{ data: SelfUser }>;
export type AxiosUser = AxiosResponse<{ data: User }>
export type PaginateUsers = PaginateCollection<User>;
export type AxiosPaginateUsers = AxiosResponse<PaginateUsers>;