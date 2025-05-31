<script setup lang="ts">
import { useRouter } from 'vue-router'
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

const router = useRouter();

const props = defineProps<{
  userId: number
}>();

const user = ref<User | SelfUser | null>(null);

function isSelfUser(user: User | SelfUser): user is SelfUser {
  return (user as SelfUser).email !== undefined;
}

const isSelf: ComputedRef<boolean> = computed(() => user.value !== null && isSelfUser(user.value))

onMounted(async () => {
  user.value = await getUser(props.userId);
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
    <UserVerifyEmailInfoBlock v-if="isSelf && !(user as SelfUser).isVerified"/>

    <div
        class="user-info-block py-3 px-2 px-sm-3 mb-4 gap-3 gap-md-0
          d-flex flex-column flex-md-row justify-content-md-between align-items-md-center"
    >
      <div class="d-flex align-items-center gap-3">
        <UserAvatar :user="user" :is-self="isSelf"/>
        <div>
          <p class="mb-0 h3">{{ user.nickname }}</p>
          <small :class="user.isOnline ? 'text-info' : 'text-muted'">
            {{ user.isOnline ? 'В сети' : 'Не в сети' }}
          </small>
        </div>
      </div>

      <div v-if="isSelf" class="d-flex flex-column flex-sm-row flex-md-column gap-3">
        <button @click="onEditUserData" class="btn btn-warning w-100">
          Изменить данные
        </button>
        <button @click="onEditUserPassword" class="btn btn-primary w-100">
          Сменить пароль
        </button>

        <UserEditDataModal ref="userEditDataModalRef" :user="user as SelfUser"/>
        <UserEditPasswordModal ref="userEditPasswordModalRef"/>
      </div>

      <div v-else-if="(user as User)?.friendshipType !== undefined" class="d-flex flex-column align-items-md-end">
        <p class="friendship-label">{{ getFriendshipDesc((user as User).friendshipType) }}</p>
        <FriendshipButtons :user="user as User" :is-normal-size="true"/>
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

  .user-info-block {
    background-color: $second-color;
    border-radius: 10px;

    .friendship-label {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>