
export interface Tab<T> {
  title: string; //Заголовок вкладки
  label: string; //Подпись вкладки в кнопке
  value: T; // Значение
}

export type Tabs<T> = Array<Tab<T>>;