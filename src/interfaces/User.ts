import { AxiosResponse } from "axios";
import { Collection, PaginateCollection } from "@/interfaces/Paginate.ts";
import { FriendshipType } from "@/enums/FriendshipType.ts";

export interface CreateUserData {
  nickname: string,
  email: string,
  password: string,
  passwordConfirmation: string
}

export interface UpdateUserData {
  nickname: string,
  email: string,
}

export interface UserInfo {
  id: number,
  nickname: string,
  avatarUrl: string | null,
}

export interface SelfUser extends UserInfo{
  email: string,
  isVerified: boolean,
  isOnline: boolean,
  statistic: Statistic,
}

export interface User extends UserInfo{
  isOnline: boolean,
  friendshipType: FriendshipType | null | undefined,
  statistic: Statistic,
}

export interface Statistic {
  games: number,
  wins: number,
  losses: number,
  points: number,
}


export type AxiosSelfUser = AxiosResponse<{ data: SelfUser }>;
export type AxiosUser = AxiosResponse<{ data: User }>
export type PaginateUsers = PaginateCollection<User>;
export type AxiosPaginateUsers = AxiosResponse<PaginateUsers>;
export type Users = Collection<User>;
export type AxiosUsers = AxiosResponse<Users>;