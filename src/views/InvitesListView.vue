<script setup lang="ts">
import { ref } from "vue";
import { InviteListTabs } from "@/enums/InviteListTabs.ts";
import InviteList from "components/InviteList.vue";
import OnlineFriendsList from "components/OnlineFriendsList.vue";
import AppSearchInput from "components/AppSearchInput.vue";
import AppListTabs from "components/AppListTabs.vue";
import { Tabs } from "@/interfaces/Tab.ts";

const tabs: Tabs<InviteListTabs> = [
  { title: 'Полученные приглашения', label: 'Полученные', value: InviteListTabs.Incoming },
  { title: 'Отправленные приглашения', label: 'Отправленные', value: InviteListTabs.Outgoing },
];

const activeTab = ref<InviteListTabs>(InviteListTabs.Incoming)
const query = ref<string>('');

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
        <AppListTabs :active-tab="activeTab" :tabs="tabs" :change-tab="changeTab"/>
        <InviteList :type="activeTab"/>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
</style>