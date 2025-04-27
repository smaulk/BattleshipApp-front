import { PaginateCollection } from "@/interfaces/Paginate.ts";
import { AxiosResponse } from "axios";

export interface UserInvite {
  friendId: number;
  nickname: string;
  avatarUrl: string | null;
  invitedAt: number;
}

export type PaginateInvites = PaginateCollection<UserInvite>;
export type AxiosPaginateInvites = AxiosResponse<PaginateInvites>;