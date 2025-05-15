import { GameType } from "@/enums/GameType.ts";

/**
 * Статус игры
 */
export enum GameStatus {
  IN_PROGRESS,
  WIN,
  LOSE,
}

const GameStatusToType: Record<GameStatus, GameType | null> = {
  [GameStatus.WIN]: GameType.WIN,
  [GameStatus.LOSE]: GameType.LOSE,
  [GameStatus.IN_PROGRESS]: null,
};

export function getGameTypeByStatus(status: GameStatus): GameType | null {
  return GameStatusToType[status];
}