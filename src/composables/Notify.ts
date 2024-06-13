import { ref, Ref } from "vue";
import Notification from "@/models/Notification.ts";
import { NotifyData } from "@/interfaces/NotifyData.ts";

export default class Notify {

  /**
   * Массив уведомлений
   */
  private static readonly _messages: Ref<Array<Notification>> = ref([]);
  static get messages(){
    return Notify._messages.value;
  }
  //Дефолтное время жизни уведомления
  private static readonly DISPLAY_TIME: number = 5000;
  //Максимальное количество уведомлений
  private static readonly MAX_MESSAGES: number = 4;

  /**
   * Отправить уведомление
   * @param title заголовок уведомления
   * @param text текст уведомления
   * @param type тип уведомления
   * @param time время жизни уведомления
   */
  public static send({
      title,
      text,
      type,
      time = Notify.DISPLAY_TIME
    }: NotifyData): void
  {
    if (Notify._messages.value.length >= Notify.MAX_MESSAGES) this.removeById(0);
    Notify._messages.value.push(new Notification(title, text, type, time));
  }

  /**
   * Удалить уведомление
   * @param id идентификатор уведомления (время создания)
   */
   static remove(id: number): void{
    Notify._messages.value.forEach((mess, i) => {
      if(mess.id === id) {
        this.removeById(i);
        return;
      }
    })
  }

  /**
   * Удалить элемент из массива
   */
  private static removeById(i: number): void{
    Notify._messages.value.splice(i, 1);
  }
}