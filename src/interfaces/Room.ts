import { AxiosResponse } from "axios";

export type AxiosRoom = AxiosResponse<{
  data:
    { roomId: string }
}>