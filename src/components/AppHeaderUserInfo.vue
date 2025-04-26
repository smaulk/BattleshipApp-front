<script setup lang="ts">
import HeaderUserAvatar from "components/AppHeaderUserAvatar.vue";

defineProps<{ nickname: string }>();

defineEmits<{
  (event: 'onProfile'): void;
  (event: 'onFriends'): void;
  (event: 'onLogout'): void;
}>();
</script>

<template>
  <div class="header-user">
    <div class="d-flex flex-row align-items-center user-info">
      <HeaderUserAvatar/>
      <h1 class="user-name not-highlight">
        {{ nickname }}
      </h1>
    </div>

    <ul class="dropdown-menu dropdown-menu-end" role="menu">
      <li role="menuitem">
        <button class="button menu-button" @click="$emit('onProfile')">Профиль</button>
      </li>
      <li role="menuitem">
        <button class="button menu-button" @click="$emit('onFriends')">Друзья</button>
      </li>
      <li role="menuitem">
        <button class="button menu-button" @click="$emit('onLogout')">Выход</button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.header-user {

  .user-info {
    gap: 0.9375rem; // 15px
    cursor: pointer;
    padding: 0 0.625rem; // 10px
    transition: color 0.3s;

    .user-name {
      width: 100%;
      color: $header-main-color;
      font-size: $font-size-header;
    }

    &:hover {
      .user-name {
        color: $header-second-color;
      }
    }
  }

  ul li {
    padding: 0 8px;
  }

  .menu-button {
    width: 100%;
    border-radius: 5px;
    font-size: calc($font-size-header / 1.2);
    padding: 5px 0;
    transition: all 0.2s;
    color: $third-color;
    background-color: white;

    &:hover {
      background-color: $header-second-color;
      color: $header-main-color;
    }
  }
}

</style>
