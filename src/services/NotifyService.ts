import Notify from "@/composables/Notify.ts";
import { NotifyType } from "@/enums/NotifyType.ts";

export default class NotifyService {

  /**
   * Уведомление об ошибке
   * @param text текст ошибки
   */
  static error(text: string): void{
    Notify.send(
      'Ошибка',
      text,
      NotifyType.Error
    )
  }

  /**
   * Уведомление об успехе
   * @param text текст уведомления
   */
  static success(text: string): void{
    Notify.send(
      'Успех',
      text,
      NotifyType.Success
    )
  }

  /**
   * Уведомление о новой заявке в друзья
   * @param nick имя пользователя
   */
  static newFriend(nick: string): void{
    Notify.send(
      'Заявка в друзья',
      `Пользователь ${nick} хочет добавить вас в друзья.`,
      NotifyType.Info,
      10000
    )
  }

  /**
   * Уведомление о приглашении в игру
   * @param nick имя пользователя
   */
  static gameInvite(nick: string): void{
    Notify.send(
      'Приглашение в игру',
      `Пользователь ${nick} приглашает вас в игру.`,
      NotifyType.Info,
      10000
    )
  }
}