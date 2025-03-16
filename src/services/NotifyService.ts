import Notify from "@/composables/Notify.ts";
import { NotifyType } from "@/enums/NotifyType.ts";

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
   * @param nickname имя пользователя
   */
  static friendRequest(nickname: string): void {
    Notify.send({
      title: 'Заявка в друзья',
      text: `Пользователь ${nickname} хочет добавить вас в друзья.`,
      type: NotifyType.Info,
      time: 10000
    });
  }

  /**
   * Уведомление о приглашении в игру
   * @param nickname имя пользователя
   */
  static gameInvite(nickname: string): void {
    Notify.send({
      title: 'Приглашение в игру',
      text: `Пользователь ${nickname} приглашает вас в игру.`,
      type: NotifyType.Info,
      time: 10000
    });
  }
}