<script setup lang="ts">

import { useLoading } from "@/composables/Loading.ts";
import { ref, watch } from "vue";
import { useList } from "@/composables/List.ts";
import { InviteListTabs } from "@/enums/InviteListTabs.ts";
import { getInInvites, getOutInvites } from "@/services/InviteApiService.ts";
import { PaginateInvites, UserInvite } from "@/interfaces/Invite.ts";
import InviteListItem from "components/InviteListItem.vue";

const props = defineProps<{
  type: InviteListTabs
}>()

const { unique } = useLoading();
const isLoaded = ref<boolean>(false);

watch(() => props.type, () => {
  search();
})

const {
  itemsList,
  items,
  loadItems,
  reset,
  removeItem,
} = useList<UserInvite>({
  itemsGetter: (lastId: number | null): Promise<PaginateInvites | null> => getInvitesForType(lastId),
});

const getInvitesForType = async (startId: number | null): Promise<PaginateInvites | null> => {
  if (props.type === InviteListTabs.Incoming) {
    return await getInInvites(startId);
  }
  if (props.type === InviteListTabs.Outgoing) {
    return await getOutInvites(startId);
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

window.addEventListener('create-invite', (): void => {
  if(props.type === InviteListTabs.Incoming) {
    search();
  }
});

</script>

<template>
  <div>
    <div v-if="isLoaded && !items.length" class="search_empty  h7">
      Ничего не найдено
    </div>

    <div v-show="items.length" class="invites-list-container" ref="itemsList">
      <transition-group :name="isLoaded ? 'fade-scale' : ''" tag="div">
        <InviteListItem
            v-for="invite in items"
            :invite="invite"
            :type="type"
            :remove="removeItem"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
.invites-list-container {
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