<script setup lang="ts">

import AppModal from "components/AppModal.vue";
import AppPasswordInput from "components/AppPasswordInput.vue";
import { ref } from "vue";
import { updatePassword } from "@/services/PasswordApiService.ts";
import { logout } from "@/services/AuthApiService.ts";
import { useLoading } from "@/composables/Loading.ts";
import { useRouter } from "vue-router";

const { unique } = useLoading();
const router = useRouter();

const modalRef = ref<typeof AppModal | null>(null);

const currentPassword = ref<string>('');
const newPassword = ref<string>('');
const newPasswordConfirm = ref<string>('');

const show = () => {
  currentPassword.value = '';
  newPassword.value = '';
  newPasswordConfirm.value = '';
  modalRef.value?.show();
}

defineExpose({ show });

const updateUserPassword = (event: Event) => {
  event.preventDefault()

  unique(async () => {
    const response = await updatePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
      newPasswordConfirmation: newPasswordConfirm.value,
    });

    if (response) {
      logout();
      modalRef.value?.close();
      await router.push({ name: 'login' });
    }
  }, undefined)
}
</script>

<template>
  <AppModal ref="modalRef">
    <form @submit.prevent="updateUserPassword">
      <div class="mb-4">
        <label for="currentPassword" class="form-label h5">Текущий пароль</label>
        <AppPasswordInput v-model="currentPassword" id="currentPassword"
                       placeholder="Введите текущий пароль" :required="true"/>
      </div>
      <div class="mb-4">
        <label for="newPassword" class="form-label h5">Новый пароль</label>
        <AppPasswordInput v-model="newPassword" id="newPassword"
                       placeholder="Введите новый пароль" :required="true" :minlength="8"/>
      </div>
      <div class="mb-4">
        <label for="newPasswordConfirm" class="form-label h5">Подтверждение пароля</label>
        <AppPasswordInput v-model="newPasswordConfirm" id="newPasswordConfirm"
                       placeholder="Повторите новый пароль" :required="true" :minlength="8"/>
      </div>
      <button type="submit" class="btn-u w-100 h6">Сменить</button>
    </form>
  </AppModal>
</template>

<style scoped lang="scss">

</style>