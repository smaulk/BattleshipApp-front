<script setup lang="ts">
import { GameListTabs } from "@/enums/GameListTabs.ts";
import { ref } from "vue";
import GameList from "components/GameList.vue";
import AppListTabs from "components/AppListTabs.vue";
import { Tabs } from "@/interfaces/Tab.ts";

const tabs: Tabs<GameListTabs> = [
  {title: 'Все игры', label: 'Все', value: GameListTabs.All },
  {title: 'Победы', label: 'Победы', value: GameListTabs.Wins },
  {title: 'Поражения', label: 'Поражения', value: GameListTabs.Losses },
];

const activeTab = ref<GameListTabs>(GameListTabs.All);

const changeTab = (tab: GameListTabs): void => {
  if (activeTab.value !== tab) {
    activeTab.value = tab;
  }
}
</script>

<template>
  <div class="games-page mx-auto">
    <AppListTabs :active-tab="activeTab" :tabs="tabs" :change-tab="changeTab" />
    <GameList :type="activeTab"/>
  </div>
</template>

<style scoped lang="scss">
.games-page {
  max-width: 700px;
  width: 100%;
  padding: 1rem;
}
</style>