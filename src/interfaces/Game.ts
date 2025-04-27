import { GameType } from "@/enums/GameType.ts";
import { PaginateCollection } from "@/interfaces/Paginate.ts";
import { AxiosResponse } from "axios";

export interface UserGame {
  id: number;
  type: GameType;
  rivalId: number;
  rivalNickname: string;
  createdAt: string;
  endedAt: string;
}

export type PaginateUserGames = PaginateCollection<UserGame>;
export type AxiosPaginateUserGames = AxiosResponse<PaginateUserGames>;