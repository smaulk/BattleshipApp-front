<script lang="ts" setup>
import { header_logo } from '@/config.ts';
import AppHeaderLogo from "components/AppHeaderLogo.vue";
import AppHeaderLink from "components/AppHeaderLink.vue";
import AppHeaderUserInfo from "components/AppHeaderUserInfo.vue";
import { ref } from "vue";
import { logout } from "@/services/AuthService.ts";
import { useRouter } from "vue-router";
import Modal from "components/Modal.vue";

const router = useRouter();
const nickname = ref<string | null>(localStorage.getItem('userNickname'))
const avatarUrl = ref<string | null>(localStorage.getItem('userAvatarUrl'))
const modalRef = ref(null);

// Слушатель события авторизации
window.addEventListener('auth', (event: any): void => {
  nickname.value = event.detail.nickname;
  avatarUrl.value = event.detail.avatarUrl;
});

const onLogout = async (): Promise<void> => {
  logout();
  await router.push({name: 'home'});
}

const showModal = (): void => {
  modalRef.value?.show();
};

</script>

<template>
  <nav class="navbar not-highlight" :class="nickname != null ? 'navbar-expand-lg' : 'navbar-expand-sm'">
    <div class="container-fluid">
      <AppHeaderLogo
          class="navbar-brand"
          :img="header_logo"
      />

      <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <template v-if="nickname != null">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item me-5">
              <AppHeaderLink :path="{name: 'home'}">Играть</AppHeaderLink>
            </li>
            <li class="nav-item me-5">
              <AppHeaderLink>Статистика</AppHeaderLink>
            </li>
            <li class="nav-item">
              <AppHeaderLink>Друзья</AppHeaderLink>
            </li>

            <li class="nav-item d-lg-none">
              <AppHeaderLink>Профиль</AppHeaderLink>
            </li>
            <li class="nav-item d-lg-none">
              <AppHeaderLink @click="showModal">Выход</AppHeaderLink>
            </li>
          </ul>
        </div>

        <AppHeaderUserInfo
            class="d-none d-lg-block"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            :nickname="nickname"
            :avatar-url="avatarUrl"
            @logout="showModal"
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

      <Modal ref="modalRef" @confirm="onLogout">
        <p class="h4">Выйти из аккаунта?</p>
      </Modal>
    </div>
  </nav>

</template>

<style lang="scss" scoped>
</style>
