import { NotifyType } from "@/enums/NotifyType.ts";

/**
 * Данные уведомления
 */
export interface NotifyData{
  // Заголовок уведомления
  title: string,
  // Текст уведомления
  text: string,
  // Тип уведомления
  type: NotifyType,
  // Время жизни уведомления
  time?: number,
  // Замыкание "принять"
  accept?: (() => Promise<boolean>) | null,
  // Замыкание "отклонить"
  reject?: (() => Promise<boolean>) | null,
}