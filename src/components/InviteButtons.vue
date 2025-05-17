<script setup lang="ts">

import { InviteListTabs } from "@/enums/InviteListTabs.ts";
import { UserInvite } from "@/interfaces/Invite.ts";
import { useLoading } from "@/composables/Loading.ts";
import { acceptInvite, deleteInvite } from "@/services/InviteApiService.ts";

const props = defineProps<{
  invite: UserInvite,
  tabType: InviteListTabs,
  removeItem: (invite: UserInvite) => void,
}>();

const { unique } = useLoading();

const accept = (invite: UserInvite) => {
  unique(async () => {
    if(await acceptInvite(invite.friendId)) {
      props.removeItem(invite);
    }
  }, undefined)
}

const remove = (invite: UserInvite) => {
  unique(async () => {
    if(await deleteInvite(invite.friendId)) {
      props.removeItem(invite);
    }
  }, undefined)
}

</script>

<template>
  <div class="d-flex flex-column flex-sm-row gap-2">
    <template v-if="tabType === InviteListTabs.Incoming">
      <button class="btn btn-success btn-sm" @click="accept(invite)">Принять</button>
      <button class="btn btn-outline-secondary btn-sm" @click="remove(invite)">Отклонить</button>
    </template>

    <template v-if="tabType === InviteListTabs.Outgoing">
      <button class="btn btn-warning btn-sm" @click="remove(invite)">Отменить</button>
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>