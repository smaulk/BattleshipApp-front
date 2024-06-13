import { NotifyType } from "@/enums/NotifyType.ts";
import Notify from "@/composables/Notify.ts";

export default class Notification{

  public text: string;
  public title: string;
  public type: NotifyType;
  public id: number = Date.now();
  private readonly timeInMs: number;
  private timeoutId: number = 0;

  /**
   * @param title заголовок уведомления
   * @param text текст уведомления
   * @param type тип уведомления
   * @param time время жизни уведомления
   */
  constructor(title: string, text: string, type: NotifyType, time: number) {
    this.title = title;
    this.text = text;
    this.type = type;
    this.timeInMs = time;
    this.setTimeout();
  }

  /**
   * Установить таймер исчезновения уведомления.
   */
  public setTimeout(): void{
    this.timeoutId = setTimeout(() => {
     this.remove()
    }, this.timeInMs);
  }

  /**
   * Убрать таймер исчезновения уведомления.
   */
  public clearTimeout(): void {
    clearTimeout(this.timeoutId);
  }

  /**
   * Удалить уведомление.
   */
  public remove(): void{
    Notify.remove(this.id)
  }
}