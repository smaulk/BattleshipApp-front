import { onMounted, ref, Ref } from "vue";
import { User } from "@/interfaces/User";
import { PaginateCollection } from "@/interfaces/Paginate.ts";

interface Params<T> {
  itemsGetter: (lastId: number | null) => Promise<T | null>,
}

interface Return<T> {
  itemsList: Ref<HTMLDivElement | null>,
  items: Ref<T[]>,
  loadItems: () => Promise<void>,
  reset: () => void,
  removeItem: (item: T) => void,
}

/**
 * Функция для работы с динамически подгружаемыми списками
 * @param itemsGetter Функция для получения новых элементов списка
 */
export function useList<T = User>({ itemsGetter }: Params<PaginateCollection<T>>): Return<T> {
  // HTML список элементов
  const itemsList = ref<HTMLDivElement | null>(null);
  // Список элеиментов
  const items: Ref<T[]> = ref([]);
  // ID последнего загруженного элемента
  const lastItemId = ref<number | null>(null);
  // Закончился ли список
  let isEnded: boolean = false;
  // Идет ли загрузка в данный момент
  let inLoad: boolean = false;

  //Cлушатель события прокрутки списка
  onMounted(() => {
    itemsList.value?.addEventListener('scroll', scrollList);
  })

  /**
   * Слушатель события прокрутки списка
   * @param event HTML элемент списка
   */
  const scrollList = (event: Event): void => {
    const list: HTMLDivElement = event.target as HTMLDivElement;
    if (list.scrollTop + list.clientHeight >= list.scrollHeight * 0.9) {
      loadItems().then();
    }
  };

  /**
   * Загружает новые элементы и добавляет их в список
   */
  const loadItems = async (): Promise<void> => {
    if (inLoad || isEnded) {
      return;
    }

    inLoad = true;
    const loaded: PaginateCollection<T> | null = await itemsGetter(lastItemId.value);
    if (loaded !== null) {
      // // Если следующего элемента нет, то список закончен
      if (loaded.meta.lastId === null) {
        isEnded = true;
      }
      // Если данные в списке есть
      if (loaded.data.length > 0) {
        if(loaded.meta.lastId !== null) {
          lastItemId.value = loaded.meta.lastId;
        }
        addItems(loaded.data)
      }
    }
    inLoad = false;
  }

  /**
   * Добавляет элементы в список.
   * @param loaded Загруженные элементы
   */
  const addItems = (loaded: T[]): void => {
    items.value.push(...loaded);
  }

  /**
   * Удаляет элемент из списка
   * @param item объект списка
   */
  const removeItem = (item: T): void => {
    const index = items.value.findIndex(i => i === item);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  }

  /**
   * Сбрасывает состояние списка
   */
  const reset = (): void => {
    items.value = [];
    lastItemId.value = null;
    isEnded = false;
    inLoad = false;
  }

  return {
    itemsList,
    items,
    loadItems,
    reset,
    removeItem,
  }
}