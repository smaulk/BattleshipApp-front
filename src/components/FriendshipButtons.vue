<script setup lang="ts">
import { FriendshipType } from "@/enums/FriendshipType.ts";
import { UserListTabs } from "@/enums/UserListTabs.ts";
import { User } from "@/interfaces/User.ts";
import { acceptFriendship, createFriendship, deleteFriendship } from "@/services/FriendshipService.ts";

const props = defineProps<{
  user: User,
  tabType: UserListTabs | null,
  removeItem: ((user: User) => void)| null,
}>();

const isAllTypes = (tabType: UserListTabs | null): boolean => !tabType || tabType === UserListTabs.Search;

const isFriend = (type: FriendshipType | null) =>
    props.tabType === UserListTabs.Friends
    || isAllTypes(props.tabType) && type === FriendshipType.FRIEND;

const isIncoming = (type: FriendshipType | null) =>
    props.tabType === UserListTabs.Incoming
    || isAllTypes(props.tabType) && type === FriendshipType.INCOMING;

const isOutgoing = (type: FriendshipType | null) =>
    props.tabType === UserListTabs.Outgoing
    || isAllTypes(props.tabType) && type === FriendshipType.OUTGOING;

const isNotFriendship = (type: FriendshipType | null) => isAllTypes(props.tabType) && type === null;


const add = async (user: User) => {
  if (await createFriendship(user.id)) {
    changeFriendshipType(user, FriendshipType.OUTGOING);
  }
}

const accept = async (user: User) => {
  if (await acceptFriendship(user.id)) {
    changeFriendshipType(user, FriendshipType.FRIEND);
  }
}

const remove = async (user: User) => {
  if (await deleteFriendship(user.id)) {
    changeFriendshipType(user, null);
  }
}

const changeFriendshipType = (user: User, type: FriendshipType | null) => {
  if (isAllTypes(props.tabType)) {
    user.friendshipType = type;
  } else if (props.removeItem) {
    props.removeItem(user);
  }
}
</script>

<template>
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
</template>

<style scoped lang="scss">

</style>