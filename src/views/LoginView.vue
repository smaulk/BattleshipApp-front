<script setup lang="ts">
import { ref } from 'vue';
import { login } from "@/services/AuthService.ts";
import { useLoading } from "@/composables/Loading.ts";
import { useRouter } from "vue-router";
import Modal from "components/Modal.vue";
import { forgotPassword } from "@/services/PasswordService.ts";
import ModalActions from "components/ModalActions.vue";

const { unique } = useLoading();
const router = useRouter();
const modalRef = ref<typeof Modal | null>(null);
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
        <div class="mb-3 h5">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control h7" id="email" placeholder="Введите email" required/>
        </div>
        <div class="mb-3 h5">
          <label for="password" class="form-label">Пароль</label>
          <input v-model="password" type="password" class="form-control h7" id="password"
                 placeholder="Введите пароль" minlength="8" required/>
        </div>
        <button type="submit" class="btn btn-u w-100 h6">Войти</button>
      </form>

      <a class="link h7 text-center" @click="showModal">Забыли пароль?</a>
    </div>

    <Modal ref="modalRef">
      <div class="mb-2">
        <label for="email" class="form-label h5 mb-3">Введите email для сброса пароля</label>
        <input v-model="resetEmail" type="email" class="form-control h7" id="email" placeholder="Введите email"
               required/>
        <label class="mt-1 muted-text">На данный email придет письмо для сброса пароля</label>
      </div>
      <ModalActions @confirm="onForgotPassword" @reject="closeModal"></ModalActions>
    </Modal>
  </div>
</template>

<style scoped lang="scss">
</style>
