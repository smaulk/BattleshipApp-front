<script lang="ts" setup>
import { DifficultyLevel, DifficultyLevelRU } from "@/enums/DifficultyLevel.ts";
import Modal from "components/Modal.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userNickname = ref<string | null>(localStorage.getItem('userNickname'));
// Слушатель события авторизации
window.addEventListener('auth', (event: any): void => {
  userNickname.value = event.detail.nickname;
});


const modalRef = ref<typeof Modal | null>(null);
const showModal = (): void => {
  modalRef.value?.show();
};
const closeModal = (): void => {
  modalRef.value?.close();
}

const onGameBot = (level: DifficultyLevel) => {
  closeModal();
  router.push({name: 'game', query: {difficulty: level}});
}

</script>

<template>
  <div class="d-flex flex-column align-items-center py-3 gap-4">
    <div class="mb-5">
      <p class="h1 text-center">Играть в морской бой</p>
    </div>

    <div class="col-12 d-flex flex-column">
      <div class="d-flex align-items-center justify-content-around">
        <div class="home-btns col-10 col-sm-8 col-lg-6 col-xl-4 d-flex flex-column align-items-center gap-3">
          <template v-if="userNickname">
            <button class="btn-u">Случайная игра</button>
            <button class="btn-u">Игра с другом</button>
            <button class="btn-u">Игра по ссылке</button>
          </template>
          <button class="btn-u" @click="showModal">Игра с ботом</button>

          <Modal ref="modalRef">
            <p class="h4 mb-4">Выберите уровень сложности</p>
            <div class="home-btns d-flex flex-column align-items-center gap-3">
              <button class="btn-u" @click="onGameBot(DifficultyLevel.Easy)">
                {{ DifficultyLevelRU[DifficultyLevel.Easy] }}
              </button>
              <button class="btn-u" @click="onGameBot(DifficultyLevel.Normal)">
                {{ DifficultyLevelRU[DifficultyLevel.Normal] }}
              </button>
            </div>
          </Modal>
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
