
export interface NotifyEvent {
  senderId: number,
  message: string
}

export interface CreateRoom {
  uid1: number,
  uid2: number,
  roomId: string,
}