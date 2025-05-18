<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from "vue";
import { userAvatar } from "@/app.config.ts";
import { formatDuration, formatRelativeTime } from "@/helpers";
import { UserGame } from "@/interfaces/Game.ts";
import { GameType, GameTypeRU } from "@/enums/GameType.ts";

const router = useRouter();

const {game} = defineProps<{
  game: UserGame,
}>();

const avatar = computed(() => game.rivalAvatarUrl || userAvatar)

const createdAt = computed(() => formatRelativeTime(game.createdAt));
const formatedDuration = computed(() => game.endedAt
    ? formatDuration(game.endedAt - game.createdAt)
    : 'Не завершена'
);

const onClickUser = (userId: number) => {
  router.push({ name: 'user', params: { userId: String(userId) } });
}

const gameStatusColor = computed(() => {
  switch (game.type) {
    case GameType.WIN: return 'text-success';  // Победа
    case GameType.LOSE: return 'text-danger';   // Поражение
    case GameType.ABANDONED: return 'text-warning';  // Прервана
    default: return 'text-info';    // Создана
  }
});
</script>



<template>
  <div class="list-item">
    <div class="list-item-data" @click.prevent="onClickUser(game.rivalId)">
      <img :src="avatar" alt="avatar" class="list-item-data-avatar" />
      <div class="d-flex flex-column justify-content-center">
        <span class="text-dark font-weight-bold">{{ game.rivalNickname }}</span>
        <span class="text-muted">{{ createdAt }}</span>
      </div>
    </div>
    <div class="d-flex flex-column justify-content-center text-end ms-auto">
      <span :class="gameStatusColor">{{ GameTypeRU[game.type] }}</span>
      <span class="text-muted">{{ formatedDuration }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>