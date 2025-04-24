<script setup lang="ts">
import { ref } from 'vue'
import UserList from "components/UserList.vue";
import { UserListTabs } from "@/enums/UserListTabs.ts";

const tabs = [
  { label: 'Друзья', value: UserListTabs.Friends },
  { label: 'Входящие', value: UserListTabs.Incoming },
  { label: 'Исходящие', value: UserListTabs.Outgoing },
  { label: 'Поиск', value: UserListTabs.Search },
]

const activeTab = ref<UserListTabs>(UserListTabs.Friends)
const query = ref<string>('');

const userList = ref<typeof UserList | null>(null);

const clearQuery = (): void => {
  query.value = '';
}

const changeTab = (tab: UserListTabs): void => {
  activeTab.value = tab;
  clearQuery();
}

</script>

<template>
  <div class="friends-page mx-auto">
    <h1 class="h2 mb-4">{{tabs[activeTab].label}}</h1>

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

    <div class="mb-3">
      <div class="input-group">
        <input
            type="text"
            class="form-control"
            placeholder="Поиск..."
            v-model="query"
        />
        <button v-if="query !== ''" class="btn btn-light bg-white btn-input" type="button" @click="clearQuery">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>
    </div>

    <UserList ref="userList" :type="activeTab" :query="query" />
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