<script setup lang="ts">
import HeaderUserAvatar from "components/AppHeaderUserAvatar.vue";
import HeaderUserMenu from "components/AppHeaderUserMenu.vue";

const { nickname } = defineProps<{ nickname: string }>();

const emits = defineEmits<{
  (event: 'logout'): void;
}>();

const logout = () => {
  emits('logout');
}

</script>

<template>
  <div>
    <div class="d-flex flex-row align-items-center user-info">
      <HeaderUserAvatar/>
      <h1 class="user-name not-highlight">
        {{ nickname }}
      </h1>
    </div>
    <HeaderUserMenu @logout="logout"/>
  </div>
</template>

<style scoped lang="scss">

.user-info {
  gap: 15px;
  cursor: pointer;
  padding: 0 10px;
  transition: all 0.3s;

  .user-name {
    width: 100%;
    color: $header-main-color;
    font-size: $font-size-header;

  }

  * {
    z-index: 1;
  }

  &:hover {
    .user-name {
      color: $header-second-color;
    }
  }
}

</style>
