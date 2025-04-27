import { AxiosRoom } from "@/interfaces/Room.ts";
import { handleApiResponse } from "@/api/response.ts";
import { request } from "@/axios.config.ts";
import { AxiosNoContent } from "@/interfaces/AxiosResponse.ts";

export async function apiCreateRoom(): Promise<AxiosRoom> {
  return handleApiResponse<AxiosRoom>(request.post('/api/v1/rooms'))
}

export async function apiJoinRoom(roomId: string): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.post(`/api/v1/rooms/${roomId}/join`))
}

export async function apiStartSearchRoom(): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.post('/api/v1/room-queue'));
}

export async function apiStopSearchRoom(): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.delete('/api/v1/room-queue'));
}