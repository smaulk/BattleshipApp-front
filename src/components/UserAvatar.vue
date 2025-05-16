<script setup lang="ts">
import { deleteAvatar, updateAvatar } from "@/services/UserApiService.ts";
import { useLoading } from "@/composables/Loading.ts";
import { computed, ref } from "vue";
import { userAvatar } from "@/app.config.ts";
import { SelfUser, User } from "@/interfaces/User.ts";
import AppModal from "components/AppModal.vue";
import AppModalActions from "components/AppModalActions.vue";

const { unique } = useLoading();

const { user } = defineProps<{
  user: SelfUser | User;
  isSelf: boolean;
}>();

const avatarUrl = computed(() => user?.avatarUrl || userAvatar);

window.addEventListener('auth', (event: any): void => {
  user.avatarUrl = event.detail.avatarUrl;
});

const onSelectAvatar = (): void => {
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = false;
  input.accept = 'image/*';
  input.onchange = onUploadAvatar;
  input.click();
};

const onUploadAvatar = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.item(0);
  if (file) {
    updateAvatar(file);
  }
}

const removeAvatarModalRef = ref<typeof AppModal | null>(null);

const showRemoveAvatarModal = () => {
  removeAvatarModalRef.value?.show();
}

const closeRemoveAvatarModal = () => {
  removeAvatarModalRef.value?.close();
}

const removeAvatar = () => {
  unique(async () => {
    const result = await deleteAvatar();
    if (result) {
      closeRemoveAvatarModal();
    }
  }, undefined)
}
</script>

<template>
  <div class="avatar-wrapper">
    <img :src="avatarUrl" alt="avatar" class="avatar"/>

    <div v-if="isSelf" class="avatar-overlay">
      <button class="avatar-button" @click="onSelectAvatar">
        <span>📤</span>
      </button>

      <button v-if="user?.avatarUrl" class="avatar-button" @click="showRemoveAvatarModal">
        <span>🗑️</span>
      </button>

      <AppModal ref="removeAvatarModalRef">
        <p class="text-center h6">Удалить аватар?</p>
        <AppModalActions @confirm="removeAvatar" @reject="closeRemoveAvatarModal"/>
      </AppModal>
    </div>
  </div>
</template>

<style scoped lang="scss">
$avatarSize: 100px;
.avatar-wrapper {
  position: relative;
  width: $avatarSize;
  height: $avatarSize;

  &:hover .avatar-overlay {
    opacity: 1;
    pointer-events: all;
  }
}

.avatar {
  border-radius: 25%;
  border: 2px solid $main-color;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: white;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); // Затемнение
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  border-radius: 25%;
}

.avatar-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
}
</style>