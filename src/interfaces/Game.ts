import { GameType } from "@/enums/GameType.ts";
import { PaginateCollection } from "@/interfaces/Paginate.ts";
import { AxiosResponse } from "axios";

export interface UserGame {
  id: number;
  type: GameType;
  rivalId: number;
  rivalNickname: string;
  rivalAvatarUrl: string | null;
  createdAt: number;
  endedAt: number | null;
}

export type PaginateUserGames = PaginateCollection<UserGame>;
export type AxiosPaginateUserGames = AxiosResponse<PaginateUserGames>;