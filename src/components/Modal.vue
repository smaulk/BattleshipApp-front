<script setup lang="ts">
import { ref } from "vue";

const isVisible = ref<boolean>(false);

const show = (): void => {
  isVisible.value = true;
};

const close = (): void => {
  isVisible.value = false;
};

defineExpose({ show, close });
</script>

<template>
  <transition name="fade">
    <div v-show="isVisible" class="modal-overlay" @click.self="close">
      <transition name="fade-scale">
        <div v-if="isVisible" class="modal-content">
          <button type="button" class="close-btn btn-close" aria-label="Close" @click="close"></button>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  position: relative;
  background: $background-color;
  color: $main-color;
  padding: 30px;
  border-radius: clamp(8px, 0.5vw, 12px);
  text-align: center;
  width: min(90%, 400px);
  box-shadow: 0 6px 15px rgba(60, 60, 60, 0.4);
  border: 2px solid $second-color;
}

.close-btn {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 1.8rem;
  height: 1.8rem;
  background-color: $main-color;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 1001;
  opacity: 1;

  &:hover {
    background-color: darken($main-color, 10%);
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>
