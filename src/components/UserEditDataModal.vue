<script setup lang="ts">

import AppModal from "components/AppModal.vue";
import { ref } from "vue";
import { SelfUser } from "@/interfaces/User.ts";
import { updateUser } from "@/services/UserApiService.ts";
import { useLoading } from "@/composables/Loading.ts";

const { unique } = useLoading();

const {user} = defineProps<{
  user: SelfUser
}>();

const modalRef = ref<typeof AppModal | null>(null);

const newNickname = ref<string>('');
const newEmail = ref<string>('');

const show = () => {
  newNickname.value = user.nickname || '';
  newEmail.value = user.email || '';
  modalRef.value?.show();
}

defineExpose({ show });

const updateUserData = (event: Event) => {
  event.preventDefault()

  if (newNickname.value === user.nickname && newEmail.value === user.email) {
    modalRef.value?.close();
    return;
  }

  unique(async () => {
    const result: SelfUser | null = await updateUser({ nickname: newNickname.value, email: newEmail.value });
    if (!result) {
      return;
    }

    user.nickname = result.nickname;
    user.email = result.email;
    modalRef.value?.close();
  }, undefined)
}
</script>

<template>
  <AppModal ref="modalRef">
    <form @submit.prevent="updateUserData">
      <div class="mb-4">
        <label for="nickname" class="form-label h5">Никнейм</label>
        <input v-model="newNickname" type="text" class="form-control h7" id="nickname"
               placeholder="Введите никнейм" minlength="3" maxlength="18" required/>
      </div>
      <div class="mb-4">
        <label for="email" class="form-label h5">Email</label>
        <input v-model="newEmail" type="email" class="form-control h7" id="email" placeholder="Введите email"
               required/>
      </div>
      <button type="submit" class="btn-u w-100 h6">Сохранить</button>
    </form>
  </AppModal>
</template>

<style scoped lang="scss">

</style>