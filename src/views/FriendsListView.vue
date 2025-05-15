<script setup lang="ts">
import { ref } from 'vue'
import UserList from "components/UserList.vue";
import { UserListTabs } from "@/enums/UserListTabs.ts";
import AppSearchInput from "components/AppSearchInput.vue";

const tabs = [
  { label: 'Друзья', value: UserListTabs.Friends },
  { label: 'Входящие', value: UserListTabs.Incoming },
  { label: 'Исходящие', value: UserListTabs.Outgoing },
  { label: 'Поиск', value: UserListTabs.Search },
]

const activeTab = ref<UserListTabs>(UserListTabs.Friends)
const query = ref<string>('');

const userList = ref<typeof UserList | null>(null);

const changeTab = (tab: UserListTabs): void => {
  if(activeTab.value !== tab) {
    activeTab.value = tab;
    query.value = '';
  }
}

</script>

<template>
  <div class="friends-page mx-auto">
    <h1 class="h2 mb-4">{{tabs[activeTab - 1].label}}</h1>

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

    <AppSearchInput v-model="query"/>
    <UserList ref="userList" :type="activeTab" :query="query"/>
  </div>
</template>

<style scoped lang="scss">
.friends-page {
  max-width: 700px;
  width: 100%;
  padding: 1rem;

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
}

</style>