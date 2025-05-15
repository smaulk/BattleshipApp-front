<script setup lang="ts">

import UserList from "components/UserList.vue";
import { ref } from "vue";
import { InviteListTabs } from "@/enums/InviteListTabs.ts";
import InviteList from "components/InviteList.vue";
import OnlineFriendsList from "components/OnlineFriendsList.vue";
import AppSearchInput from "components/AppSearchInput.vue";


const tabs = [
  { label: 'Полученные', value: InviteListTabs.Incoming },
  { label: 'Отправленные', value: InviteListTabs.Outgoing },
]

const activeTab = ref<InviteListTabs>(InviteListTabs.Incoming)
const query = ref<string>('');

const userList = ref<typeof UserList | null>(null);


const changeTab = (tab: InviteListTabs): void => {
  if (activeTab.value !== tab) {
    activeTab.value = tab;
  }
}
</script>

<template>
  <div class="container invites-page py-5">
    <div class="row">

      <div class="col-12 col-lg-5 mb-4 mb-lg-0 px-5">
        <h1 class="h2 mb-4">Друзья в сети</h1>
        <AppSearchInput v-model="query"/>
        <OnlineFriendsList :query="query"/>
      </div>

      <div class="col-12 col-lg-7 px-5">
        <h1 class="h2 mb-4">{{ tabs[activeTab - 1].label }} приглашения</h1>

        <ul class="nav nav-tabs mb-3 not-highlight">
          <li class="nav-item" v-for="t in tabs" :key="t.value">
            <a
                class="nav-link"
                :class="{ active: activeTab === t.value }"
                href="#"
                @click.prevent="changeTab(t.value)"
            >
              {{ t.label }}
            </a>
          </li>
        </ul>

        <InviteList ref="userList" :type="activeTab"/>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-tabs {
  background-color: $main-color;
  border-top-right-radius: 0.5em;
  border-top-left-radius: 0.5em;
}
.nav-link {
  color: black;

  &.active {
    color: white;
    font-weight: bold;
    background-color: $second-color;
    border-color: $second-color;

    &:hover {
      color: white;
    }
  }

  &:hover {
    color: $second-color;
  }
}
</style>