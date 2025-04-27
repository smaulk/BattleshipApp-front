import { apiCreateRoom, apiStartSearchRoom, apiStopSearchRoom } from "@/api/room.ts";

async function createRoom(): Promise<string | null> {
  const response = await apiCreateRoom();
  if(response.status === 201) {
    return response.data.data.roomId;
  }

  return null;
}

async function startSearchRoom(): Promise<boolean> {
  const response = await apiStartSearchRoom();
  return response.status === 204;
}

async function stopSearchRoom(): Promise<boolean> {
  const response = await apiStopSearchRoom();
  return response.status === 204;
}

export {
  createRoom,
  startSearchRoom,
  stopSearchRoom,
}