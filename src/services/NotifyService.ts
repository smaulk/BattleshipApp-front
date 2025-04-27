import Notify from "@/composables/Notify.ts";
import { NotifyType } from "@/enums/NotifyType.ts";
import { acceptFriendship, deleteFriendship } from "@/services/FriendshipApiService.ts";
import { acceptInvite, deleteInvite } from "@/services/InviteApiService.ts";

export default class NotifyService {

  /**
   * Уведомление об ошибке
   * @param text текст ошибки
   */
  static error(text: string): void {
    Notify.send({
      title: 'Ошибка',
      text: text,
      type: NotifyType.Error,
    });
  }

  /**
   * Уведомление об успехе
   * @param text текст уведомления
   */
  static success(text: string): void {
    Notify.send({
      title: 'Успех',
      text: text,
      type: NotifyType.Success,
    });
  }

  /**
   * Уведомление с информацией
   * @param title заголовок уведомления
   * @param text текст уведомления
   */
  static info(title: string, text: string): void {
    Notify.send({
      title: title,
      text: text,
      type: NotifyType.Info,
      time: 10000,
    })
  }


  /**
   * Уведомление о новой заявке в друзья
   * @param message
   * @param senderId
   */
  static newFriendRequest(message: string, senderId: number): void {
    Notify.send({
      title: 'Новая заявка в друзья',
      text: message,
      type: NotifyType.Info,
      time: 10000,
      accept: async (): Promise<boolean> => {
        return await acceptFriendship(senderId);
      },
      reject: async (): Promise<boolean> => {
        return await deleteFriendship(senderId);
      }
    });
  }

  /**
   * Уведомление о приглашении в игру
   * @param message
   * @param senderId
   */
  static gameInvite(message: string, senderId: number): void {
    Notify.send({
      title: 'Приглашение в игру',
      text: message,
      type: NotifyType.Info,
      time: 10000,
      accept: async (): Promise<boolean> => {
        return await acceptInvite(senderId);
      },
      reject: async (): Promise<boolean> => {
        return await deleteInvite(senderId);
      }
    });
  }
}