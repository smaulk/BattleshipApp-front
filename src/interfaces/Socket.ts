
export interface NotifyEvent {
  senderId: number,
  message: string
}

export interface CreateRoom {
  uid1: number,
  uid2: number,
  roomId: string,
}

export interface CreateGame {
  gameId: number,
  firstPlayerId: number,
}

export interface EndGame {
  status: boolean,
}