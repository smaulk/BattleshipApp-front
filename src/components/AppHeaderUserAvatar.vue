<script setup lang="ts">
import { computed, ref } from "vue";
import { userAvatar } from "@/app.config.ts";

const avatarUrl = ref<string | null>(localStorage.getItem('userAvatarUrl') || null)

// Слушатель события авторизации
window.addEventListener('auth', (event: any): void => {
  avatarUrl.value = event.detail.avatarUrl;
});

const avatar = computed(() => avatarUrl.value || userAvatar)

</script>

<template>
  <div>
    <img :src="avatar" alt="" class="avatar not-highlight"/>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  border-radius: 25%;
  border: 2px solid $main-color;
  width: 60px;
  aspect-ratio: 1 / 1;
  background: white;
}
</style>
