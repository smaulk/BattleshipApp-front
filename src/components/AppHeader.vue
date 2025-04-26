<script lang="ts" setup>
import { headerLogo } from '@/game.config.ts';
import AppHeaderLogo from "components/AppHeaderLogo.vue";
import AppHeaderLink from "components/AppHeaderLink.vue";
import AppHeaderUserInfo from "components/AppHeaderUserInfo.vue";
import { computed, ref } from "vue";
import { logout } from "@/services/AuthService.ts";
import { useRouter } from "vue-router";
import AppModal from "components/AppModal.vue";
import AppModalActions from "components/AppModalActions.vue";

const router = useRouter();
const nickname = ref<string | null>(localStorage.getItem('userNickname'))
const modalRef = ref<typeof AppModal | null>(null);

const getUserId = (userId: string | number | null): number | null => {
  const parsed = userId !== null ? Number(userId) : null;
  return parsed !== null && Number.isInteger(parsed) ? parsed : null
}

const storedUserId = localStorage.getItem('userId');
const userId = ref<number | null>(getUserId(storedUserId));

const isAuth = computed(() => userId.value !== null && nickname.value !== null)

// Слушатель события авторизации
window.addEventListener('auth', (event: any): void => {
  nickname.value = event.detail.nickname;
  userId.value = getUserId(event.detail.userId);
});

const showModal = (): void => {
  modalRef.value?.show();
};

const closeModal = (): void => {
  modalRef.value?.close();
}

const onLogout = async (): Promise<void> => {
  logout();
  closeModal();
  await router.push({name: 'home'});
}

const onProfile = () => {
  router.push({name: 'user', params: {id: userId.value}});
}

const onFriends = () => {
  router.push({name: 'friends'});
}
</script>

<template>
  <nav class="navbar navbar-expand-sm not-highlight">
    <div class="container-fluid">
      <AppHeaderLogo
          class="navbar-brand"
          :img="headerLogo"
      />

      <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <template v-if="isAuth">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item d-sm-none">
              <AppHeaderLink @click="onProfile">Профиль</AppHeaderLink>
            </li>
            <li class="nav-item d-sm-none">
              <AppHeaderLink @click="onFriends">Друзья</AppHeaderLink>
            </li>
            <li class="nav-item d-sm-none">
              <AppHeaderLink @click="showModal">Выход</AppHeaderLink>
            </li>
          </ul>
        </div>

        <AppHeaderUserInfo
            class="d-none d-sm-block"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            :nickname="nickname"
            @onProfile="onProfile"
            @onFriends="onFriends"
            @onLogout="showModal"
        />
      </template>

      <template v-else>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto me-3">
            <li class="nav-item me-4">
              <AppHeaderLink :path="{name: 'login'}">Вход</AppHeaderLink>
            </li>
            <li class="nav-item">
              <AppHeaderLink :path="{name: 'register'}">Регистрация</AppHeaderLink>
            </li>
          </ul>
        </div>
      </template>

      <AppModal ref="modalRef">
        <p class="h4 text-center">Выйти из аккаунта?</p>
        <AppModalActions @confirm="onLogout" @reject="closeModal"></AppModalActions>
      </AppModal>
    </div>
  </nav>

</template>

<style lang="scss" scoped>
</style>
