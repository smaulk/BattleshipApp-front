<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from "vue";
import { userAvatar } from "@/app.config.ts";
import { User } from "@/interfaces/User.ts";

const router = useRouter();

const { user } = defineProps<{
  user: User,
  number: number,
}>();

const avatar = computed(() => user.avatarUrl || userAvatar)

const onClickUser = (userId: number) => {
  router.push({ name: 'user', params: { userId: String(userId) } });
}

</script>

<template>
  <div class="list-item">
    <div class="list-item-data" @click.prevent="onClickUser(user.id)">
      <span class="text-dark">{{ number }}.</span>
      <img :src="avatar" alt="avatar" class="list-item-data-avatar"/>
      <div class="list-item-data-content text-dark font-weight-bold">
        <span class="list-item-data-text">{{ user.nickname }}</span>
      </div>
    </div>
    <div class="stats-block text-dark h7">
      <span class="text-success" title="Победы">{{ user.statistic.wins }}</span> /
      <span class="text-danger" title="Поражения">{{ user.statistic.losses }}</span> /
      <span class="text-warning" title="Очки">{{ user.statistic.points }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stats-block {
  display: flex;
  gap: 0.2rem;
}
</style>