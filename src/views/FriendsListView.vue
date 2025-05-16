<script setup lang="ts">
import { ref } from 'vue'
import UserList from "components/UserList.vue";
import { UserListTabs } from "@/enums/UserListTabs.ts";
import AppSearchInput from "components/AppSearchInput.vue";
import AppListTabs from "components/AppListTabs.vue";
import { Tabs } from "@/interfaces/Tab.ts";

const tabs: Tabs<UserListTabs> = [
  { title: 'Друзья', label: 'Друзья', value: UserListTabs.Friends },
  { title: 'Входящие заявки', label: 'Входящие', value: UserListTabs.Incoming },
  { title: 'Исходящие заявки', label: 'Исходящие', value: UserListTabs.Outgoing },
  { title: 'Поиск пользователей', label: 'Поиск', value: UserListTabs.Search },
];

const activeTab = ref<UserListTabs>(UserListTabs.Friends)
const query = ref<string>('');

const changeTab = (tab: UserListTabs): void => {
  if (activeTab.value !== tab) {
    activeTab.value = tab;
    query.value = '';
  }
}
</script>

<template>
  <div class="friends-page mx-auto">
    <AppListTabs :active-tab="activeTab" :tabs="tabs" :change-tab="changeTab"/>
    <AppSearchInput v-model="query"/>
    <UserList :type="activeTab" :query="query"/>
  </div>
</template>

<style scoped lang="scss">
.friends-page {
  max-width: 700px;
  width: 100%;
  padding: 1rem;
}
</style>