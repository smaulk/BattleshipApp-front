<script setup lang="ts">
import { Tabs } from "@/interfaces/Tab.ts";
defineProps<{
  activeTab: number;
  tabs: Tabs<number>,
  changeTab: (tab: number) => void
}>();

</script>

<template>
  <h1 class="h2 mb-4">{{tabs[activeTab - 1].title}}</h1>

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