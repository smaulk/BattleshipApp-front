import { PaginateUserGamesParams } from "@/interfaces/Paginate.ts";
import { AxiosPaginateUserGames } from "@/interfaces/Game.ts";
import { handleApiResponse } from "@/api/response.ts";
import { request } from "@/axios.config.ts";
import { AxiosNoContent } from "@/interfaces/AxiosResponse.ts";

export async function apiGetGames(data: PaginateUserGamesParams): Promise<AxiosPaginateUserGames> {
  return handleApiResponse<AxiosPaginateUserGames>(request.get('/api/v1/users/me/games', {params: data}));
}

export async function apiStartGame(roomId: string): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.put(`/api/v1/rooms/${roomId}`));
}

export async function apiFinishGame(gameId: number): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.put(`/api/v1/games/${gameId}`));
}