<script setup lang="ts">
import UserListItem from './UserListItem.vue'
import { UserListTabs } from "@/enums/UserListTabs.ts";
import { useList } from "@/composables/List.ts";
import { PaginateUsers, User } from "@/interfaces/User.ts";
import { getFriends, getInRequests, getOutRequests } from "@/services/FriendshipService.ts";
import { PaginateUsersParams } from "@/interfaces/Paginate.ts";
import { useLoading } from "@/composables/Loading.ts";
import { ref, watch } from "vue";
import { getUsers } from "@/services/UserService.ts";

const props = defineProps<{
  type: UserListTabs
  query: string
}>()

const { unique } = useLoading();
const isLoaded = ref<boolean>(false);

let oldQuery = props.query.trim();
watch(() => props.query, () => {
  if (oldQuery !== props.query.trim()) {
    search();
  }
  oldQuery = props.query.trim();
});

watch(() => props.type, () => {
  search();
})

const {
  itemsList,
  items,
  loadItems,
  reset,
  removeItem,
} = useList<User>({
  itemsGetter: (lastId: number | null): Promise<PaginateUsers | null> => getUsersForType({
    startId: lastId,
    nickname: props.query.trim(),
    isOnline: null,
  }),
});

const getUsersForType = async (data: PaginateUsersParams) => {
  if (props.type === UserListTabs.Friends) {
    return await getFriends(data);
  }
  if (props.type === UserListTabs.Outgoing) {
    return await getOutRequests(data);
  }
  if (props.type === UserListTabs.Incoming) {
    return await getInRequests(data);
  }
  if (props.type === UserListTabs.Search && props.query.trim() !== '') {
    return await getUsers(data);
  }

  return null;
}

const search = (): void => {
  unique(async () => {
    reset();
    isLoaded.value = false;
    await loadItems();
    isLoaded.value = true;
  }, undefined)
}
search();

</script>

<template>
  <div>
    <div v-if="isLoaded && !items.length" class="search_empty  h7">
      Ничего не найдено
    </div>

    <div v-show="items.length" class="user-list-container" ref="itemsList">
      <transition-group :name="isLoaded ? 'fade-scale' : ''" tag="div">
        <UserListItem
            v-for="user in items"
            :key="user.id"
            :user="user"
            :type="type"
            :remove="removeItem"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-list-container {
  max-height: 65vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.search_empty {
  color: white;
  display: flex;
  justify-content: center;
}
</style>