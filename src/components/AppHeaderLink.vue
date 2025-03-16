<script setup lang="ts">

import { RouterLink } from "vue-router";

const { path } = defineProps({
  path: [Object, String]
});
</script>

<template>
  <component
      :is="path ? RouterLink : 'a'"
      :to="path"
      class="header-link link not-highlight"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">

.header-link {
  color: $header-main-color;
  font-size: $font-size-header;
  position: relative; /* Для позиционирования ::before абсолютно */
  overflow: hidden; /* Чтобы скрыть элемент ::before за пределами родительского элемента */
  display: inline-block; /* Чтобы ::before не занимал всю ширину родительского элемента */

  &:hover {
    color: $header-second-color;

    &::before {
      transform: scaleX(1); /* Плавно показываем полоску при наведении */
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px; /* Толщина полоски */
    background-color: $header-border-color;
    transform: scaleX(0); /* Изначально полоска невидима */
    transform-origin: bottom center;
    transition: transform 0.3s ease-out; /* Анимация раскрытия */
  }

}
</style>
