<script setup lang="ts">

import { User } from "@/interfaces/User.ts";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { userAvatar } from "@/app.config.ts";

const props = defineProps<{
  user: User,
}>();

const router = useRouter();

const avatar = computed(() => props.user.avatarUrl || userAvatar)

const onClickUser = (userId: number) => {
  router.push({name: 'user', params: {userId: String(userId)}});
}
</script>

<template>
  <div class="list-item">
    <div class="list-item-data" @click.prevent="onClickUser(user.id)">
      <img :src="avatar" alt="avatar" class="list-item-data-avatar"/>
      <div class="text-dark d-flex align-items-center">
        {{ user.nickname }}
        <span :class="['status-indicator', user.isOnline ? 'online' : 'offline']"></span>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 5px;
}

.online {
  background-color: #04bd04;
}
.offline {
  background-color: #6c757d;
}

.fade-scale {
  &-enter-active, &-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  &-enter-from, &-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }

  &-enter-to, &-leave-from {
    opacity: 1;
    transform: scale(1);
  }
}
</style>