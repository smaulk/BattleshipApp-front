<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { VerifyEmail } from "@/interfaces/Email.ts";
import { verifyEmail } from "@/services/EmailApiService.ts";

const route = useRoute();
const isVerified = ref<boolean | null>(null);

const confirmEmail = async (data: VerifyEmail) => {
  isVerified.value = await verifyEmail(data);
};

onMounted(() => {
  const { id, hash } = route.params;
  const { expiration, signature } = route.query;

  if (!id || !hash || !expiration || !signature) {
    isVerified.value = false;
    return;
  }

  const userId = Number(id);
  const exp = Number(expiration);

  if (isNaN(userId) || isNaN(exp)) {
    isVerified.value = false;
    return;
  }

  confirmEmail({ userId: userId, hash: hash.toString(), expiration: exp, signature: signature.toString() });
});
</script>

<template>
  <div class="status-container">
    <p v-if="isVerified === null" class="loading loading-anim">Подождите...</p>
    <p v-else-if="!isVerified" class="error">Ссылка недействительна</p>
    <p v-else class="success">Email успешно подтвержден!</p>
  </div>
</template>

<style scoped lang="scss">
</style>
