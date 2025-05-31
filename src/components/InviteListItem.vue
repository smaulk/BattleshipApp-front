<script setup lang="ts">
import { UserInvite } from "@/interfaces/Invite.ts";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { userAvatar } from "@/app.config.ts";
import { InviteListTabs } from "@/enums/InviteListTabs.ts";
import InviteButtons from "components/InviteButtons.vue";
import { formatRelativeTime } from "@/helpers";

const router = useRouter();

const { invite } = defineProps<{
  invite: UserInvite,
  type: InviteListTabs,
  remove: (invite: UserInvite) => void,
}>();

const avatar = computed(() => invite.avatarUrl || userAvatar)

const invitedDate = computed(() => formatRelativeTime(invite.invitedAt));

const onClickUser = (userId: number) => {
  router.push({ name: 'user', params: { userId: String(userId) } });
}
</script>

<template>
  <div class="list-item">
    <div class="list-item-data" @click.prevent="onClickUser(invite.friendId)">
      <img :src="avatar" alt="avatar" class="list-item-data-avatar"/>
      <div class="d-flex flex-column justify-content-center overflow-hidden">
        <div class="list-item-data-content text-dark">
          <span class="list-item-data-text">{{ invite.nickname }}</span>
        </div>
        <span class="text-muted">{{ invitedDate }}</span>
      </div>
    </div>

    <InviteButtons :invite="invite" :tab-type="type" :remove-item="remove"/>
  </div>
</template>

<style scoped lang="scss">
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