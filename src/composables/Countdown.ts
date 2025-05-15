import { ref, onBeforeUnmount } from 'vue';

export function useCountdown() {
  const timeLeft = ref<number>(0);
  let interval: number;

  const startCountdown = (ttl: number) => {
    timeLeft.value = ttl;

    clearInterval(interval); // Очищаем предыдущий интервал, если он был
    interval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  onBeforeUnmount(() => {
    clearInterval(interval);
  });

  return { timeLeft, startCountdown };
}