<script setup lang="ts">
import { useList } from "@/composables/List.ts";
import { PaginateUserGames, UserGame } from "@/interfaces/Game.ts";
import { GameListTabs } from "@/enums/GameListTabs.ts";
import { getGames } from "@/services/GameApiService.ts";
import { GameType } from "@/enums/GameType.ts";
import GameListItem from "components/GameListItem.vue";
import { useLoading } from "@/composables/Loading.ts";
import { ref, watch } from "vue";

const props = defineProps<{
  type: GameListTabs
}>()

const { unique } = useLoading();
const isLoaded = ref<boolean>(false);

watch(() => props.type, () => {
  search();
})

const {
  itemsList,
  items,
  loadItems,
  reset,
  removeItem,
} = useList<UserGame>({
  itemsGetter: (lastId: number | null): Promise<PaginateUserGames | null> => getGamesForType(lastId),
});

const getGamesForType = async (startId: number | null): Promise<PaginateUserGames | null> => {
  if (props.type === GameListTabs.All) {
    return await getGames({type: null, startId: startId});
  }
  if (props.type === GameListTabs.Wins) {
    return await getGames({type: GameType.WIN, startId: startId});
  }
  if (props.type === GameListTabs.Losses) {
    return await getGames({type: GameType.LOSE, startId: startId});
  }

  return null;
}

const search = (): void => {
  unique(async () => {
    reset();
    isLoaded.value = false;
    await loadItems();
    isLoaded.value = true;
  }, undefined)
}
search();

</script>

<template>
  <div>
    <div v-if="isLoaded && !items.length" class="search_empty  h7">
      Ничего не найдено
    </div>

    <div v-show="items.length" class="list-container" ref="itemsList">
        <GameListItem
            v-for="game in items"
            :game="game"
        />
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>