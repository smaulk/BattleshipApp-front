<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { resetPassword } from "@/services/PasswordApiService.ts";
import AppPasswordInput from "components/AppPasswordInput.vue";

const route = useRoute();
const router = useRouter();

const isValidUrl = ref<boolean>(true);
const password = ref<string>('')
const passwordConfirmation = ref<string>('')

onMounted(() => {
  if (!route.query.email) {
    isValidUrl.value = false;
  }
})

const token = route.params.token.toString();
const email = route.query.email?.toString();

const onResetPassword = async () => {
  if (!email || !token) {
    isValidUrl.value = false;
    return;
  }
  if (!password.value || !passwordConfirmation.value) {
    return;
  }

  const result = await resetPassword({
    token: token,
    email: email,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
  });

  if (result) {
    await router.push({ name: "login" });
  }
}
</script>

<template>
  <div v-if="isValidUrl" class="container d-flex justify-content-center align-items-center">
    <div class="app-card shadow-sm p-4">
      <h2 class="text-center mb-4 h3">Сброс пароля</h2>
      <form @submit.prevent="onResetPassword">
        <div class="mb-4">
          <label for="password" class="form-label h5">Новый пароль</label>
          <AppPasswordInput v-model="password" id="password" placeholder="Введите новый пароль"
                         :minlength="8" :required="true"/>
        </div>
        <div class="mb-4">
          <label for="passwordConfirmation" class="form-label h5">Подтверждение пароля</label>
          <AppPasswordInput v-model="passwordConfirmation" id="passwordConfirmation" placeholder="Повторите пароль"
                         :minlength="8" :required="true"/>
        </div>
        <button type="submit" class="btn-u w-100 h6">Сбросить пароль</button>
      </form>
    </div>
  </div>

  <div v-else class="status-container">
    <p class="error">Ссылка недействительна</p>
  </div>
</template>

<style scoped lang="scss">
</style>