<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <slot></slot>
      <div class="modal-actions">
        <button class="btn-u h7" @click="confirm">Ок</button>
        <button class="btn-cancel h7" @click="close">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref<boolean>(false);
const emit = defineEmits<{
  (event: 'confirm'): void;
}>();

const show = (): void => {
  isVisible.value = true;
};

const close = (): void => {
  isVisible.value = false;
};

const confirm = (): void => {
  emit('confirm');
  close();
};

defineExpose({ show });
</script>


<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75); // Затемнил фон
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px; // Чтобы модалка не прижималась к краям экрана
}

.modal-content {
  background: $background-color;
  color: $main-color;
  padding: 30px;
  border-radius: clamp(8px, 0.5vw, 12px);
  text-align: center;
  width: min(90%, 400px); // Теперь не растягивается на весь экран
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  border: 2px solid $second-color;
}

.modal-actions {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style>
