<script setup lang="ts">
import { ref } from 'vue';
import { login } from "@/services/AuthService.ts";
import { useLoading } from "@/composables/Loading.ts";
import { useRouter } from "vue-router";
import Modal from "components/Modal.vue";
import { forgotPassword } from "@/services/PasswordService.ts";

const { unique } = useLoading();
const router = useRouter();
const modalRef = ref(null);
const email = ref('');
const password = ref('');
const resetEmail = ref('');


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

const onForgotPassword = () => {
  unique(async (): Promise<void> => {
    await forgotPassword(resetEmail.value);
  }, undefined);
}

</script>

<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card shadow-sm p-4" style="max-width: 400px; width: 100%">
      <h2 class="text-center mb-4 h3">Вход</h2>
      <div class="mb-3 h5">
        <label for="email" class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control h7" id="email" placeholder="Введите email"/>
      </div>
      <div class="mb-3 h5">
        <label for="password" class="form-label">Пароль</label>
        <input v-model="password" type="password" class="form-control h7" id="password"
               placeholder="Введите пароль"/>
      </div>
      <button class="btn btn-u w-100 h6" @click="onLogin">Войти</button>

      <a class="link h7 text-center" @click="showModal">Забыли пароль?</a>
    </div>
    <Modal ref="modalRef" @confirm="onForgotPassword">
      <div class="mb-2">
        <label for="email" class="form-label h4">Введите email для сброса пароля</label>
        <input v-model="resetEmail" type="email" class="form-control h7" id="email" placeholder="Введите email"/>
        <label class="mt-1 muted-text">На данный email придет письмо для сброса пароля</label>
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="scss">
</style>
