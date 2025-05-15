import { apiCreateRoom, apiJoinRoom, apiStartSearchRoom, apiStopSearchRoom } from "@/api/room.ts";

/**
 * Создает комнату
 */
async function createRoom(): Promise<string | null> {
  const response = await apiCreateRoom();
  if(response.status === 201) {
    return response.data.data.roomId;
  }

  return null;
}

/**
 * Подключается к комнате, возвращает оставшееся время жизни комнаты
 * @param roomId
 */
async function joinRoom(roomId: string): Promise<number | null> {
  const response = await apiJoinRoom(roomId);
  if(response.status === 200) {
    // Отнимаем, для учета задержки
    return response.data.data.roomTtl - 5;
  }

  return null;
}

/**
 * Запускает поиск случайного противника
 */
async function startSearchRoom(): Promise<boolean> {
  const response = await apiStartSearchRoom();
  return response.status === 204;
}

/**
 * Останавливает поиск случайного противника
 */
async function stopSearchRoom(): Promise<boolean> {
  const response = await apiStopSearchRoom();
  return response.status === 204;
}

export {
  createRoom,
  joinRoom,
  startSearchRoom,
  stopSearchRoom,
}