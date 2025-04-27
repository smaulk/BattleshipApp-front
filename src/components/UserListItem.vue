<script setup lang="ts">
import { UserListTabs } from "@/enums/UserListTabs.ts";
import { userAvatar } from "@/game.config.ts";
import { computed } from "vue";
import { User } from "@/interfaces/User.ts";
import { useRouter } from "vue-router";
import FriendshipButtons from "components/FriendshipButtons.vue";

const props = defineProps<{
  user: User,
  type: UserListTabs,
  remove: (user: User) => void,
}>();

const router = useRouter();

const avatar = computed(() => props.user.avatarUrl || userAvatar)

const onClickUser = (userId: number) => {
  router.push({name: 'user', params: {id: String(userId)}});
}

</script>

<template>
  <div class="d-flex align-items-center justify-content-between p-3 user-list-item">
    <div class="d-flex align-items-center gap-3 user-list-item-data" @click.prevent="onClickUser(user.id)">
      <img :src="avatar" alt="avatar" class="avatar"/>
      <div class="text-dark">
        {{ user.nickname }}
        <span :class="['status-indicator', user.isOnline ? 'online' : 'offline']"></span>
      </div>
    </div>

   <FriendshipButtons
       :user="user"
       :tab-type="type"
       :remove-item="remove"
   />
  </div>
</template>

<style lang="scss" scoped>
.user-list-item {
  $border: 1px solid #5e5e5e;
  background-color: #eceeec;
  border: $border;
  border-top: none;

  &:first-child {
    border-top: $border;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .user-list-item-data {
    cursor: pointer;
  }
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 3px;
}

.online {
  background-color: #04bd04;
}
.offline {
  background-color: #6c757d;
}

.text-dark {
  color: black;
  font-weight: bold;
}

$avatarSize: 50px;

.avatar {
  border-radius: 25%;
  border: 2px solid $main-color;
  width: $avatarSize;
  height: $avatarSize;
  background: white;
}

.fade-scale {
  &-enter-active, &-leave-active {
    transition: opacity 0.5s, transform 0.3s ease;
  }

  &-enter, &-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }

  &-enter-to, &-leave {
    opacity: 1;
    transform: scale(1);
  }
}
</style>