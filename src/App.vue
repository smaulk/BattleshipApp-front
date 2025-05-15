<script lang="ts" setup>
import AppHeader from "components/AppHeader.vue";
import AppNotify from "components/AppNotify.vue";
import { connectChannelEvents, connectChannelOnline } from "@/helpers/socket.ts";

const userId = +(localStorage.getItem('userId') || 0);
connectChannelOnline(userId);
connectChannelEvents(userId);

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
          :key="$route.fullPath"
      />
    </transition>
  </RouterView>

  <AppNotify />
</template>

<style lang="scss" scoped>
</style>
