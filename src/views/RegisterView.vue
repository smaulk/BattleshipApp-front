<script setup lang="ts">
import { reactive } from 'vue';
import { login } from "@/services/AuthApiService.ts";
import { createUser } from "@/services/UserApiService.ts";
import { useLoading } from "@/composables/Loading.ts";
import { useRouter } from "vue-router";
import AppPasswordInput from "components/AppPasswordInput.vue";

const { unique } = useLoading();
const router = useRouter();
const userData = reactive({
  nickname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

const onRegister = (event: Event) => {
  event.preventDefault();

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
    <div class="app-card shadow-sm p-4">
      <h2 class="text-center mb-4 h3">Регистрация</h2>
      <form @submit.prevent="onRegister">
        <div class="mb-3">
          <label for="nickname" class="form-label h5">Никнейм</label>
          <input v-model="userData.nickname" type="text" class="form-control h7" id="nickname"
                 placeholder="Введите никнейм" minlength="3" maxlength="18" required/>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label h5">Email</label>
          <input v-model="userData.email" type="email" class="form-control h7" id="email" placeholder="Введите email"
                 required/>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label h5">Пароль</label>
          <AppPasswordInput v-model="userData.password" id="password" placeholder="Введите пароль" :required="true"
                         :minlength="8"/>
        </div>
        <div class="mb-4">
          <label for="passwordConfirmation" class="form-label h5">Подтверждение пароля</label>
          <AppPasswordInput v-model="userData.passwordConfirmation" id="passwordConfirmation"
                         placeholder="Повторите пароль" :required="true" :minlength="8"/>
        </div>
        <button type="submit" class="btn-u w-100 h6">Зарегистрироваться</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
