<script lang="ts" setup>
import AppHeader from "components/AppHeader.vue";
import AppNotify from "components/AppNotify.vue";
</script>

<template>
  <AppHeader/>

  <RouterView
      v-slot="{ Component }"
      class="container-fluid flex-grow-1 pb-3"
  >
    <transition mode="out-in" name="fade-slide">
      <component
          :is="Component"
      />
    </transition>
  </RouterView>

  <AppNotify />
</template>

<style lang="scss" scoped>
</style>
