<script setup lang="ts">
import { UserInvite } from "@/interfaces/Invite.ts";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { userAvatar } from "@/game.config.ts";
import { InviteListTabs } from "@/enums/InviteListTabs.ts";
import InviteButtons from "components/InviteButtons.vue";
import { formatRelativeTime } from "@/helpers";

const router = useRouter();

const props = defineProps<{
  invite: UserInvite,
  type: InviteListTabs,
  remove: (invite: UserInvite) => void,
}>();

const avatar = computed(() => props.invite.avatarUrl || userAvatar)

const invitedDate = computed(() => formatRelativeTime(props.invite.invitedAt));

const onClickUser = (userId: number) => {
  router.push({ name: 'user', params: { userId: String(userId) } });
}
</script>

<template>
  <div class="d-flex align-items-center justify-content-between p-3 invite-list-item">
    <div class="d-flex align-items-center gap-3 invite-list-item-data" @click.prevent="onClickUser(invite.friendId)">
      <img :src="avatar" alt="avatar" class="avatar"/>
      <div class="d-flex flex-column justify-content-center">
        <span class="text-dark">{{ invite.nickname }}</span>
        <span class="text-muted">{{ invitedDate }}</span>
      </div>
    </div>

    <InviteButtons :invite="invite" :tab-type="type" :remove-item="remove" />
  </div>
</template>

<style scoped lang="scss">

.invite-list-item {
  $border: 2px solid $second-color;
  background-color: $list-item-color;
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

  .invite-list-item-data {
    cursor: pointer;
  }
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