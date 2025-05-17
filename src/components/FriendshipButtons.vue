<script setup lang="ts">
import { FriendshipType } from "@/enums/FriendshipType.ts";
import { UserListTabs } from "@/enums/UserListTabs.ts";
import { User } from "@/interfaces/User.ts";
import { acceptFriendship, createFriendship, deleteFriendship } from "@/services/FriendshipApiService.ts";
import { useLoading } from "@/composables/Loading.ts";
import { computed } from "vue";

const props = defineProps<{
  user: User,
  tabType?: UserListTabs | null,
  removeItem?: ((user: User) => void) | null,
  isNormalSize?: boolean,
}>();

const { unique } = useLoading();

const isAllTypes = (tabType: UserListTabs | null | undefined): boolean => !tabType || tabType === UserListTabs.Search;

const isFriend = (type: FriendshipType | null | undefined) =>
    props.tabType === UserListTabs.Friends
    || isAllTypes(props.tabType) && type === FriendshipType.FRIEND;

const isIncoming = (type: FriendshipType | null | undefined) =>
    props.tabType === UserListTabs.Incoming
    || isAllTypes(props.tabType) && type === FriendshipType.INCOMING;

const isOutgoing = (type: FriendshipType | null | undefined) =>
    props.tabType === UserListTabs.Outgoing
    || isAllTypes(props.tabType) && type === FriendshipType.OUTGOING;

const isNotFriendship = (type: FriendshipType | null | undefined) => isAllTypes(props.tabType) && type === null;


const add = (user: User) => {
  unique(async () => {
    if (await createFriendship(user.id)) {
      changeFriendshipType(user, FriendshipType.OUTGOING);
    }
  }, undefined)
}

const accept = (user: User) => {
  unique(async () => {
    if (await acceptFriendship(user.id)) {
      changeFriendshipType(user, FriendshipType.FRIEND);
    }
  }, undefined)
}

const remove = (user: User) => {
  unique(async () => {
    if (await deleteFriendship(user.id)) {
      changeFriendshipType(user, null);
    }
  }, undefined)
}

const changeFriendshipType = (user: User, type: FriendshipType | null) => {
  if (isAllTypes(props.tabType)) {
    user.friendshipType = type;
  } else if (props.removeItem) {
    props.removeItem(user);
  }
}

const btnListClass = computed(() => props.isNormalSize ? '' : 'btn-sm');
</script>

<template>
  <div class="d-flex gap-2">
    <template v-if="isFriend(user.friendshipType)">
      <button :class="['btn','btn-danger', btnListClass]" @click="remove(user)">Удалить</button>
    </template>

    <template v-else-if="isIncoming(user.friendshipType)">
      <button :class="['btn','btn-success', btnListClass]" @click="accept(user)">Принять</button>
      <button :class="['btn','btn-outline-secondary', btnListClass]" @click="remove(user)">Отклонить</button>
    </template>

    <template v-else-if="isOutgoing(user.friendshipType)">
      <button :class="['btn','btn-warning', btnListClass]" @click="remove(user)">Отменить</button>
    </template>

    <template v-else-if="isNotFriendship(user.friendshipType)">
      <button :class="['btn','btn-primary', btnListClass]" @click="add(user)">Добавить</button>
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>