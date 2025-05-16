<script setup lang="ts">

import { useLoading } from "@/composables/Loading.ts";
import { ref, watch } from "vue";
import { useList } from "@/composables/List.ts";
import { getFriends } from "@/services/FriendshipApiService.ts";
import { PaginateUsers, User } from "@/interfaces/User.ts";
import UserListItem from "components/UserListItem.vue";
import { createInvite } from "@/services/InviteApiService.ts";

const { unique } = useLoading();
const isLoaded = ref<boolean>(false);

const props = defineProps<{
  query: string
}>();

let oldQuery = props.query.trim();
watch(() => props.query, () => {
  if (oldQuery !== props.query.trim()) {
    search();
  }
  oldQuery = props.query.trim();
});

const {
  itemsList,
  items,
  loadItems,
  reset,
  removeItem,
} = useList<User>({
  itemsGetter: (lastId: number | null): Promise<PaginateUsers | null> => getFriends({
    startId: lastId,
    nickname: props.query.trim(),
    isOnline: true,
  }),
});


const search = (): void => {
  unique(async () => {
    reset();
    isLoaded.value = false;
    await loadItems();
    isLoaded.value = true;
  }, undefined)
}

search();

const onInviteFriend = (id: number): void => {
  unique(async () => {
    await createInvite(id);
  }, undefined)
}
</script>

<template>
  <div>
    <div v-if="isLoaded && !items.length" class="search_empty  h7">
      Ничего не найдено
    </div>

    <div v-show="items.length" class="list-container" ref="itemsList">
      <transition-group :name="isLoaded ? 'fade-scale' : ''" tag="div">
        <UserListItem
            v-for="user in items"
            :key="user.id"
            :user="user">
          <button class="btn btn-primary" @click="onInviteFriend(user.id)">Пригласить</button>
        </UserListItem>
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>