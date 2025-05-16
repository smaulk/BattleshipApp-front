<script setup lang="ts">
import { getLeaderboard } from "@/services/UserApiService.ts";
import { ref } from "vue";
import { User } from "@/interfaces/User.ts";
import LeaderboardListItem from "components/LeaderboardListItem.vue";

const users = ref<User[] | null>(null);
const loadLeaderboard = async () => {
  users.value = await getLeaderboard();
}

loadLeaderboard();
</script>

<template>
  <div>
    <p class="h2 text-center">Топ игроков</p>
    <div v-if="users && users.length" class="list-container mt-2" ref="itemsList">
      <LeaderboardListItem
          v-for="(user, key) in users"
          :user="user"
          :number="key + 1"
      />
    </div>
    <div v-else class="h5 text-center text-important">
      Данные не найдены
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>