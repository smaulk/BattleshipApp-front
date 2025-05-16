<script lang="ts" setup>
import { DifficultyLevel, DifficultyLevelRU } from "@/enums/DifficultyLevel.ts";
import AppModal from "components/AppModal.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import GameSearchModal from "components/GameSearchModal.vue";
import { useLoading } from "@/composables/Loading.ts";
import { createRoom } from "@/services/RoomApiService.ts";
import { GameMode } from "@/enums/GameMode.ts";
import LeaderboardList from "components/LeaderboardList.vue";

const router = useRouter();
const { unique } = useLoading();

const userId = ref<string | null>(localStorage.getItem('userId'));
// Слушатель события авторизации
window.addEventListener('auth', (event: any): void => {
  userId.value = event.detail.userId;
});


const botGameModalRef = ref<typeof AppModal | null>(null);
const showBotGameModal = (): void => {
  botGameModalRef.value?.show();
};
const closeBotGameModal = (): void => {
  botGameModalRef.value?.close();
}

const onGameBot = (level: DifficultyLevel) => {
  closeBotGameModal();
  router.push({ name: 'play', query: { mode: GameMode.BOT, difficulty: level } });
}

const searchGameModalRef = ref<typeof GameSearchModal | null>(null);
const onSearchGame = () => {
  searchGameModalRef.value?.show();
}

const onCreateLinkGame = () => {
  unique(async () => {
    const roomId = await createRoom();
    if (!roomId) {
      return;
    }

    await router.push({ name: 'play', query: { mode: GameMode.LINK, roomId: roomId } });
  }, undefined)
}

const onFriendGame = () => {
  router.push({ name: 'invites' });
}

</script>

<template>
  <div class="d-flex row gap-5 gap-lg-0">
    <div class="col-12 col-lg-7 d-flex flex-column align-items-center justify-content-center py-3 gap-4">
      <p class="h1 text-center">Играть в морской бой</p>

      <div class="d-flex align-items-center justify-content-center container">
        <div class="home-btns d-flex flex-column align-items-center gap-3 col-10 col-sm-8 col-lg-6">
          <template v-if="userId">
            <button class="btn-u" @click="onSearchGame">Случайная игра</button>
            <button class="btn-u" @click="onFriendGame">Игра с другом</button>
            <button class="btn-u" @click="onCreateLinkGame">Игра по ссылке</button>
          </template>
          <button class="btn-u" @click="showBotGameModal">Игра с ботом</button>

          <AppModal ref="botGameModalRef">
            <p class="h4 mb-4 text-center">Выберите уровень сложности</p>
            <div class="home-btns d-flex flex-column align-items-center gap-3">
              <button class="btn-u" @click="onGameBot(DifficultyLevel.Easy)">
                {{ DifficultyLevelRU[DifficultyLevel.Easy] }}
              </button>
              <button class="btn-u" @click="onGameBot(DifficultyLevel.Normal)">
                {{ DifficultyLevelRU[DifficultyLevel.Normal] }}
              </button>
            </div>
          </AppModal>

          <GameSearchModal ref="searchGameModalRef"/>
        </div>
      </div>
    </div>

    <LeaderboardList class="col-12 col-lg-5 d-flex flex-column justify-content-center px-lg-5"/>
  </div>
</template>

<style lang="scss" scoped>
.home-btns {
  button {
    font-size: calc(1.4rem + 0.4vw);
    padding: 10px;
  }
}
</style>
