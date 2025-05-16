import { GameType } from "@/enums/GameType.ts";

export interface Collection<T> {
  data: T[];
}

export interface PaginateCollection<T> extends Collection<T> {
  meta: {
    lastId: number | null;
  }
}

export interface PaginateUsersParams {
  startId: number | null;
  nickname: string | null;
  isOnline: boolean | null;
}

export interface PaginateUserGamesParams {
  startId: number | null;
  type: GameType | null;
}