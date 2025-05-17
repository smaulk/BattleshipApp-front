<script setup lang="ts">
import { computed } from 'vue';

const { timeLeft } = defineProps<{
  timeLeft: number
}>();

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const formattedTime = computed(() => {
  return timeLeft > 0 ? formatTime(timeLeft) : 'Время вышло!';
});

const isCritical = computed(() => timeLeft <= 30 && timeLeft > 0);
const isFinished = computed(() => timeLeft <= 0);
</script>

<template>
  <div class="countdown d-flex align-items-center justify-content-center not-highlight"
       :class="{ critical: isCritical, finished: isFinished }">
    <div class="time-display">
      <span class="time">{{ formattedTime }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes blink {
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0.5;
  }
}

.countdown {
  background-color: #343a40;
  color: white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: calc(1rem + 0.5vw);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  min-width: 120px;
  transition: all 0.3s ease;
  text-align: center;

  .time-display {
    font-weight: bold;
    letter-spacing: 1px;
  }

  &.critical {
    background-color: #ff4d4d;
    animation: blink 1s infinite;
  }

  &.finished {
    background-color: #888;
    color: #ddd;
  }
}
</style>