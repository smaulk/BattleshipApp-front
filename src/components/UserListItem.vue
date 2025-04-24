<script setup lang="ts">
import { UserListTabs } from "@/enums/UserListTabs.ts";
import { userAvatar } from "@/game.config.ts";
import { computed } from "vue";
import { acceptFriendship, createFriendship, deleteFriendship } from "@/services/FriendshipService.ts";
import { FriendshipType } from "@/enums/FriendshipType.ts";
import { User } from "@/interfaces/User.ts";
import { useRouter } from "vue-router";

const props = defineProps<{
  user: User,
  type: UserListTabs,
  remove: (user: User) => void,
}>();

const router = useRouter();

const avatar = computed(() => props.user.avatarUrl || userAvatar)


const add = async (user: User) => {
  const result = await createFriendship(user.id);
  if (result) {
    changeFriendshipType(user, FriendshipType.OUTGOING);
  }
}

const accept = async (user: User) => {
  const result = await acceptFriendship(user.id);
  if (result) {
    changeFriendshipType(user, FriendshipType.FRIEND);
  }
}

const remove = async (user: User) => {
  const result = await deleteFriendship(user.id);
  if (result) {
    changeFriendshipType(user, null);
  }
}

const changeFriendshipType = (user: User, type: FriendshipType | null) => {
  if (props.type === UserListTabs.Search) {
    user.friendshipType = type;
  } else {
    props.remove(user);
  }
}

const isFriend = (type: FriendshipType | null) =>
    props.type === UserListTabs.Friends
    || props.type === UserListTabs.Search && type === FriendshipType.FRIEND;

const isIncoming = (type: FriendshipType | null) =>
    props.type === UserListTabs.Incoming
    || props.type === UserListTabs.Search && type === FriendshipType.INCOMING;

const isOutgoing = (type: FriendshipType | null) =>
    props.type === UserListTabs.Outgoing
    || props.type === UserListTabs.Search && type === FriendshipType.OUTGOING;

const isNotFriendship = (type: FriendshipType | null) =>
    props.type === UserListTabs.Search && type === null;

const onClickUser = (user: User) => {
  router.push({name: 'user', params: {id: String(user.id)}});
}

</script>

<template>
  <div class="d-flex align-items-center justify-content-between p-3 user-list-item">
    <div class="d-flex align-items-center gap-3 user-list-item-data" @click.prevent="onClickUser(user)">
      <img :src="avatar" alt="avatar" class="avatar"/>
      <div class="text-dark">{{ user.nickname }}</div>
    </div>

    <div class="d-flex gap-2 user-list-item-buttons">
      <template v-if="isFriend(user.friendshipType)">
        <button class="btn btn-danger btn-sm" @click="remove(user)">Удалить</button>
      </template>

      <template v-else-if="isIncoming(user.friendshipType)">
        <button class="btn btn-success btn-sm" @click="accept(user)">Принять</button>
        <button class="btn btn-outline-secondary btn-sm" @click="remove(user)">Отклонить</button>
      </template>

      <template v-else-if="isOutgoing(user.friendshipType)">
        <button class="btn btn-warning btn-sm" @click="remove(user)">Отменить</button>
      </template>

      <template v-else-if="isNotFriendship(user.friendshipType)">
        <button class="btn btn-primary btn-sm" @click="add(user)">Добавить</button>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-list-item {
  border-radius: 10px;
  background-color: #eceeec;
  margin-bottom: 10px;
  border: 1px solid #5e5e5e;

  &:last-child {
    margin-bottom: 0;
  }

  .user-list-item-data {
    cursor: pointer;
  }
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