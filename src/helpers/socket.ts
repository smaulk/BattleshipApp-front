import Echo from "laravel-echo";
import NotifyService from "@/services/NotifyService.ts";
import { CreateRoom, NotifyEvent } from "@/interfaces/Socket.ts";
import router from "@/router.config.ts";
import { GameMode } from "@/enums/GameMode.ts";

export function getEcho(): Echo<any> {
  const accessToken: string | null = localStorage.getItem('accessToken');
  window.Echo.connector.options.auth.headers.Authorization = `Bearer ${accessToken}`;

  return window.Echo;
}

export function connectChannelOnline(userId: number): void {
  if (userId <= 0) {
    return;
  }
  getEcho().private(`users.${userId}.online`);
}

export function connectChannelEvents(userId: number): void {
  if (userId <= 0) {
    return;
  }
  getEcho()
    .private(`users.${userId}.events`)
    .listen('.create.request', async (notify: NotifyEvent): Promise<void> => {
      NotifyService.newFriendRequest(notify.message, notify.senderId);
    })
    .listen('.accept.request',  async (notify: NotifyEvent): Promise<void> => {
      NotifyService.info('Заявка в друзья', notify.message)
    })
    .listen('.create.invite', async (notify: NotifyEvent): Promise<void> => {
      window.dispatchEvent(new CustomEvent('create-invite'));
      NotifyService.gameInvite(notify.message, notify.senderId);
    })
    .listen('.create.room', async (data: CreateRoom): Promise<void> => {
      NotifyService.success('Комната создана');
      await router.push({ name: 'play', query: { mode: GameMode.ONLINE, roomId: data.roomId } })
    })
}
