<script lang="ts" setup>
import { DifficultyLevel, DifficultyLevelRU } from "@/enums/DifficultyLevel.ts";
import AppModal from "components/AppModal.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import GameSearchModal from "components/GameSearchModal.vue";
import { useLoading } from "@/composables/Loading.ts";
import { createRoom } from "@/services/RoomApiService.ts";

const router = useRouter();
const { unique } = useLoading();

const userNickname = ref<string | null>(localStorage.getItem('userNickname'));
// Слушатель события авторизации
window.addEventListener('auth', (event: any): void => {
  userNickname.value = event.detail.nickname;
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
  router.push({name: 'game', query: {difficulty: level}});
}

const searchGameModalRef = ref<typeof GameSearchModal | null>(null);
const onSearchGame = () => {
  searchGameModalRef.value?.show();
}

const onCreateLinkGame = () => {
  unique(async () => {
    const roomId = await createRoom();
    if(!roomId) {
      return;
    }

    await router.push({ name: 'game', query: { room: roomId, link: 1} })
  }, undefined)
}

const onFriendGame = () => {
  router.push({name: 'invites'});
}

</script>

<template>
  <div class="d-flex flex-column align-items-center py-3 gap-4">
    <div class="mb-2">
      <p class="h1 text-center">Играть в морской бой</p>
    </div>

    <div class="col-12 d-flex flex-column">
      <div class="d-flex align-items-center justify-content-around">
        <div class="home-btns col-10 col-sm-8 col-lg-6 col-xl-4 d-flex flex-column align-items-center gap-3">
          <template v-if="userNickname">
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
