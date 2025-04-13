export interface PaginateCollection<T> {
  data: T[];
  meta: {
    lastId: number | null;
  }
}

export interface PaginateUsersParams {
  startId: number | null;
  nickname: string | null;
  isOnline: boolean | null;
}