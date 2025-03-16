<script setup lang="ts">
import { reactive } from 'vue';
import { login } from "@/services/AuthService.ts";
import { createUser } from "@/services/UserService.ts";
import { useLoading } from "@/composables/Loading.ts";
import { useRouter } from "vue-router";

const { unique } = useLoading();
const router = useRouter();
const userData = reactive({
  nickname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

const onRegister = (event: Event) => {
  event.preventDefault()

  unique(async (): Promise<void> => {
    if (!await createUser(userData)) {
      return;
    }

    await login(userData.email, userData.password)
        ? await router.push({ name: 'home' })
        : await router.push({ name: 'login' });
  }, undefined);

};

</script>

<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card shadow-sm p-4" style="max-width: 400px; width: 100%">
      <h2 class="text-center mb-4 h3">Регистрация</h2>
      <div class="mb-3 h5">
        <label for="nickname" class="form-label">Никнейм</label>
        <input v-model="userData.nickname" type="text" class="form-control h7" id="nickname"
               placeholder="Введите никнейм"/>
      </div>
      <div class="mb-3 h5">
        <label for="email" class="form-label">Email</label>
        <input v-model="userData.email" type="email" class="form-control h7" id="email" placeholder="Введите email"/>
      </div>
      <div class="mb-3 h5">
        <label for="password" class="form-label">Пароль</label>
        <input v-model="userData.password" type="password" class="form-control h7" id="password"
               placeholder="Введите пароль"/>
      </div>
      <div class="mb-3 h5">
        <label for="passwordConfirmation" class="form-label">Подтверждение пароля</label>
        <input v-model="userData.passwordConfirmation" type="password" class="form-control h7" id="passwordConfirmation"
               placeholder="Повторите пароль"/>
      </div>
      <button class="btn btn-u w-100 h6" @click="onRegister">Зарегистрироваться</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
