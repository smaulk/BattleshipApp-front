<script setup lang="ts">
import { ref } from 'vue';
import { login } from "@/services/AuthApiService.ts";
import { useLoading } from "@/composables/Loading.ts";
import { useRouter } from "vue-router";
import AppModal from "components/AppModal.vue";
import { forgotPassword } from "@/services/PasswordApiService.ts";
import AppModalActions from "components/AppModalActions.vue";
import AppPasswordInput from "components/AppPasswordInput.vue";

const { unique } = useLoading();
const router = useRouter();
const modalRef = ref<typeof AppModal | null>(null);
const email = ref<string>('');
const password = ref<string>('');
const resetEmail = ref<string>('');

const onLogin = (event: Event) => {
  event.preventDefault();

  unique(async () => {
    if (await login(email.value, password.value)) {
      await router.push({ name: 'home' })
    }
  }, undefined);
};

const showModal = (): void => {
  modalRef.value?.show();
};

const closeModal = (): void => {
  modalRef.value?.close();
}

const onForgotPassword = async (): Promise<void> => {
  const result = await unique(async (): Promise<boolean> => {
    return await forgotPassword(resetEmail.value);
  }, false);

  if (result) {
    closeModal();
  }
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="app-card shadow-sm p-4">
      <h2 class="text-center mb-4 h3">Вход</h2>
      <form @submit.prevent="onLogin">
        <div class="mb-3">
          <label for="email" class="form-label h5">Email</label>
          <input v-model="email" type="email" class="form-control h7" id="email" placeholder="Введите email" required/>
        </div>
        <div class="mb-4">
          <label for="password" class="form-label h5">Пароль</label>
          <AppPasswordInput v-model="password" id="password" placeholder="Введите пароль" :required="true" :minlength="8"/>
        </div>
        <button type="submit" class="btn-u w-100 h6">Войти</button>
      </form>

      <a class="link h7 text-center" @click="showModal">Забыли пароль?</a>
    </div>

    <AppModal ref="modalRef">
      <div class="mb-2 text-center">
        <label for="email" class="form-label h5 mb-3">Введите email для сброса пароля</label>
        <input v-model="resetEmail" type="email" class="form-control h7" id="email" placeholder="Введите email"
               required/>
        <label class="mt-1 muted-text">На данный email придет письмо для сброса пароля</label>
      </div>
      <AppModalActions @confirm="onForgotPassword" @reject="closeModal"></AppModalActions>
    </AppModal>
  </div>
</template>

<style scoped lang="scss">
</style>
