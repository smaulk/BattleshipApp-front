import { PaginateUserGamesParams } from "@/interfaces/Paginate.ts";
import { apiFinishGame, apiGetGames, apiStartGame } from "@/api/game.ts";
import { PaginateUserGames } from "@/interfaces/Game.ts";
import { GameType } from "@/enums/GameType.ts";

async function getGames(data: PaginateUserGamesParams): Promise<PaginateUserGames | null> {
  const response = await apiGetGames(data);

  if(response.status === 200) {
    return response.data;
  }
  return null;
}

async function startGame(roomId: string): Promise<boolean> {
  const response = await apiStartGame(roomId);
  return response.status === 204;
}

async function finishGame(gameId: number, type: GameType): Promise<boolean> {
  const response = await apiFinishGame(gameId, type);
  return response.status === 204;
}

export {
  getGames,
  startGame,
  finishGame,
}