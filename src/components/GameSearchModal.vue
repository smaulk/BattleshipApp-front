<script setup lang="ts">
import AppModal from "components/AppModal.vue";
import { ref, onUnmounted } from "vue";
import { startSearchRoom, stopSearchRoom } from "@/services/RoomApiService.ts";

const modalRef = ref<typeof AppModal | null>(null);
const seconds = ref<number>(0);
let timer: number | null = null;
let isStartedSearch = false;

const show = () => {
  modalRef.value?.show();
  startSearchRoom();
  setInterval();
  isStartedSearch = true;
};

const setInterval = () => {
  seconds.value = 0;
  timer = window.setInterval(() => {
    seconds.value++;
  }, 1000);
}

const resetInterval = () => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

const onClose = () => {
  modalRef.value?.close();
};

const beforeClose = () => {
  if(isStartedSearch) {
    stopSearchRoom();
    resetInterval();
    isStartedSearch = false;
  }
}

onUnmounted(() => {
  beforeClose();
});

defineExpose({ show });

</script>

<template>
  <AppModal ref="modalRef" :before-close="beforeClose">
    <div class="search-game-modal d-flex flex-column align-items-center justify-content-center gap-4 py-5">
      <div class="loader"></div>
      <p class="h4 mb-0 text-center loading-anim">Поиск игры... {{ seconds }} сек.</p>
    </div>
    <button class="btn-u btn-cancel btn-stop mt-4" @click="onClose">Отмена</button>
  </AppModal>
</template>

<style scoped lang="scss">

.btn-cancel {
  padding: 10px;
}

$loaderSize: 100px;
.loader {
  width: $loaderSize;
  height: $loaderSize;
  border-radius: 50%;
  border: 6px solid transparent;
  border-top: 6px solid #3498db;
  border-right: 6px solid $second-color;
  animation: spinAndPulse 1.5s linear infinite;
  position: relative;
  background: conic-gradient(from 0deg, #3498db, $second-color, #3498db);
  background-size: 200% 200%;
}

.loader::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: $background-color;
  border-radius: 50%;
}

@keyframes spinAndPulse {
  0% {
    transform: rotate(0deg) scale(1);
    background-position: 0 50%;
  }
  25% {
    transform: rotate(90deg) scale(1.05);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
    background-position: 100% 50%;
  }
  75% {
    transform: rotate(270deg) scale(1.05);
  }
  100% {
    transform: rotate(360deg) scale(1);
    background-position: 0 50%;
  }
}

.loading-anim {
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

</style>