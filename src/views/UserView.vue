<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ComputedRef, onMounted, ref } from "vue";
import { SelfUser, User } from "@/interfaces/User.ts";
import { getUser } from "@/services/UserApiService.ts";
import FriendshipButtons from "components/FriendshipButtons.vue";
import { FriendshipType } from "@/enums/FriendshipType.ts";
import UserStatistic from "components/UserStatistic.vue";
import UserEditDataModal from "components/UserEditDataModal.vue";
import UserEditPasswordModal from "components/UserEditPasswordModal.vue";
import UserAvatar from "components/UserAvatar.vue";
import UserVerifyEmailInfoBlock from "components/UserVerifyEmailInfoBlock.vue";

const route = useRoute()
const router = useRouter();

const userId = Number(route.params.id);
const user = ref<User | SelfUser | null>(null);

function isSelfUser(user: User | SelfUser): user is SelfUser {
  return (user as SelfUser).email !== undefined;
}
const isSelf: ComputedRef<boolean> = computed(() => user.value !== null && isSelfUser(user.value))

onMounted(async () => {
  user.value = await getUser(userId);
  if (!user.value) {
    await router.push({ name: '404' });
  }
})

const friendshipDescriptions: Record<FriendshipType, string> = {
  [FriendshipType.FRIEND]: 'У вас в друзьях',
  [FriendshipType.OUTGOING]: 'Вы отправили заявку в друзья',
  [FriendshipType.INCOMING]: 'Хочет добавить вас в друзья'
};
const getFriendshipDesc = (type: FriendshipType | null): string => {
  if (type === null) return 'Добавить в друзья';
  return friendshipDescriptions[type] ?? '';
};

const userEditDataModalRef = ref<typeof UserEditDataModal | null>(null);
const onEditUserData = () => {
  userEditDataModalRef.value?.show();
}

const userEditPasswordModalRef = ref<typeof UserEditPasswordModal | null>(null);
const onEditUserPassword = () => {
  userEditPasswordModalRef.value?.show();
}
</script>

<template>
  <div v-if="user" class="user-page p-4">
    <UserVerifyEmailInfoBlock v-if="isSelf && !(user as SelfUser).isVerified" />

    <div class="user-info-block d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center gap-3">
        <UserAvatar :user="user" :is-self="isSelf" />

        <div>
          <p class="mb-0 h2">{{ user.nickname }}</p>
          <small :class="user.isOnline ? 'text-info' : 'text-muted'">
            {{ user.isOnline ? 'В сети' : 'Не в сети' }}
          </small>
        </div>
      </div>

      <div v-if="isSelf" class="ms-5 d-flex flex-column gap-3">
        <button @click="onEditUserData" class="btn btn-warning btn-sm w-100">
          Изменить данные
        </button>
        <button @click="onEditUserPassword" class="btn btn-primary btn-sm w-100">
          Сменить пароль
        </button>

        <UserEditDataModal ref="userEditDataModalRef" :user="user as SelfUser" />
        <UserEditPasswordModal ref="userEditPasswordModalRef" />
      </div>

      <div v-else-if="(user as User)?.friendshipType !== undefined" class="ms-5 d-flex flex-column align-items-end">
        <p class="h7">{{ getFriendshipDesc((user as User).friendshipType) }}</p>
        <FriendshipButtons :user="user as User"/>
      </div>
    </div>

    <UserStatistic :statistic="user.statistic"/>
  </div>

  <div v-else class="text-center py-5 loading-anim">
    Загрузка...
  </div>
</template>

<style scoped lang="scss">
.user-page {
  max-width: 750px;
}

.user-info-block {
  background-color: $second-color;
  padding: 20px;
  border-radius: 10px;
}
</style>