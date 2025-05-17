<script setup lang="ts">
import { ref } from "vue";
import { sendEmailVerification } from "@/services/EmailApiService.ts";
import { useLoading } from "@/composables/Loading.ts";

const { unique } = useLoading();

const hideVerifyAlert = ref(false);
const sendVerificationEmail = () => {
  unique(async () => {
    await sendEmailVerification();
  }, undefined)
}
</script>

<template>
  <div v-if="!hideVerifyAlert" class="alert alert-warning d-flex justify-content-between align-items-center">
    <div>
      Пожалуйста, подтвердите вашу почту!
    </div>
    <div class="d-flex gap-2">
      <button class="btn btn-primary btn-sm btn-compact" @click="sendVerificationEmail">
        Отправить письмо
      </button>
      <button class="btn-close" aria-label="Закрыть" @click="hideVerifyAlert = true"></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.btn-compact {
  line-height: 1.1;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>