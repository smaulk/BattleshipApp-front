import Notify from "@/composables/Notify.ts";
import { NotifyType } from "@/enums/NotifyType.ts";

export default class NotifyService {

  /**
   * Уведомление об ошибке
   * @param text текст ошибки
   */
  static error(text: string): void{
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
  static success(text: string): void{
    Notify.send({
      title: 'Успех',
      text: text,
      type: NotifyType.Success,
    });
  }

  /**
   * Уведомление о новой заявке в друзья
   * @param nick имя пользователя
   */
  static newFriend(nick: string): void{
    Notify.send({
      title: 'Заявка в друзья',
      text: `Пользователь ${nick} хочет добавить вас в друзья.`,
      type: NotifyType.Info,
      time: 10000
    });
  }

  /**
   * Уведомление о приглашении в игру
   * @param nick имя пользователя
   */
  static gameInvite(nick: string): void{
    Notify.send({
      title: 'Приглашение в игру',
      text: `Пользователь ${nick} приглашает вас в игру.`,
      type: NotifyType.Info,
      time: 10000
    });
  }
}