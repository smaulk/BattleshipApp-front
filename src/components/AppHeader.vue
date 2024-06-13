<script lang="ts" setup>
import { header_logo } from '@/config.ts';
import AppHeaderLogo from "components/AppHeaderLogo.vue";
import AppHeaderLink from "components/AppHeaderLink.vue";
import AppHeaderUserInfo from "components/AppHeaderUserInfo.vue";

const isAuthenticated = false;
</script>

<template>
  <nav class="navbar navbar-expand-lg not-highlight">
    <div class="container-fluid justify-content-between">
      <AppHeaderLogo
          class="navbar-brand"
          :img="header_logo"
      />

      <template v-if="isAuthenticated">

        <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item me-5">
              <AppHeaderLink >Играть</AppHeaderLink>
            </li>
            <li class="nav-item me-5">
              <AppHeaderLink >Аналитика</AppHeaderLink>
            </li>
            <li class="nav-item">
              <AppHeaderLink >Друзья</AppHeaderLink>
            </li>


            <li class="nav-item d-lg-none">
              <AppHeaderLink >Настройки</AppHeaderLink>
            </li>
            <li class="nav-item d-lg-none">
              <AppHeaderLink :path="{name:'Logout'}">Выход</AppHeaderLink>
            </li>
          </ul>
        </div>

        <AppHeaderUserInfo
            class="d-none d-lg-block"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        />

      </template>

      <div v-else>
        <AppHeaderLink
          :path="{name: 'Login'}"
        >
          Войти
        </AppHeaderLink>
      </div>
    </div>
  </nav>

</template>

<style lang="scss" scoped>
</style>
