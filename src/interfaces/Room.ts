import { AxiosResponse } from "axios";

export type AxiosRoom = AxiosResponse<{
  data:
    { roomId: string }
}>;

export type AxiosJoinRoom = AxiosResponse<{
  data:
    { roomTtl: number }
}>;