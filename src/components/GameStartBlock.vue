<script lang="ts" setup>
import { computed, ref } from "vue";
import ShipPlacementBlock from "components/ShipPlacementBlock.vue";
import { ShipData } from "@/interfaces/ShipData.ts";
import { DifficultyLevel, DifficultyLevelRU } from "@/enums/DifficultyLevel.ts";
import { CellsMatrix } from "@/interfaces/CellsMatrix.ts";
import ShipsCounterService from "@/services/ShipsCounterService.ts";
import { UserInfo } from "@/interfaces/User.ts";
import { userAvatar } from "@/app.config.ts";
import { useRouter } from "vue-router";
import Countdown from "components/Countdown.vue";

const router = useRouter();

const props = defineProps<{
  isBotGame: boolean,
  difficultyLevel: DifficultyLevel | null,
  rival: UserInfo | null,
  startGame: (cells: CellsMatrix, ships: Array<ShipData>) => Promise<boolean>,
  roomTtl: number,
}>();

let cells: CellsMatrix = [];
let ships: Array<ShipData> = [];
const shipCounter: ShipsCounterService = new ShipsCounterService();
const isAllPlaced = ref(true);

const checkIsAllPlaced = () => {
  isAllPlaced.value = shipCounter.isAllPlaced();
}

const isStartingGame = ref<boolean>(false);

const startGameClick = async () => {
  checkIsAllPlaced();
  if (isAllPlaced.value) {
    if (await props.startGame(cells, ships)) {
      isStartingGame.value = true;
    }
  }
}

const avatar = computed(() => props.rival?.avatarUrl || userAvatar)

const onClickUser = (userId: number) => {
  const url = router.resolve({ name: 'user', params: { userId: String(userId) } }).href;
  window.open(url, '_blank');
}
</script>

<template>
  <div class="row row-cols-1 row-cols-xl-2 d-flex justify-content-center justify-content-xl-between py-3">
    <div class=
             "col-10 col-xl-4 d-flex flex-column flex-lg-row flex-xl-column
             align-items-center align-items-lg-start align-items-xl-center justify-content-center gap-xl-2"
    >
      <template v-if="!isBotGame">
        <Countdown :time-left="roomTtl" />
        <div v-if="rival" class="d-flex justify-content-center align-items-center gap-4 mb-5 rival-block">
          <span class="h6">Противник</span>
          <div class="d-flex align-items-center gap-3 rival-data" @click.prevent="onClickUser(rival.id)">
            <img :src="avatar" alt="avatar" class="avatar"/>
            <div class="h7">
              {{ rival.nickname }}
            </div>
          </div>
        </div>

        <div v-else class="h7 loading-anim">
          Ожидание подключения противника...
        </div>
      </template>


      <div class="d-flex flex-column  col-12 col-sm-10 col-lg-6 col-xl-12 gap-1 gap-xl-3 text-center ">
        <p class="h1">Разместите корабли</p>
        <p v-if="difficultyLevel" class="h6">
          Уровень сложности: {{ DifficultyLevelRU[difficultyLevel as DifficultyLevel] }}
        </p>
      </div>
      <div class=
               "col-12 col-sm-10 col-lg-6 col-xl-12 d-flex flex-column
               align-items-center gap-1 gap-xl-3 start-block"
      >
        <div class="col-10 col-sm-8 col-xl-9">
          <button
              class="btn-u btn-start-game"
              @click="startGameClick"
              :disabled="isStartingGame"
          >
            Начать игру
          </button>
        </div>

        <p v-if="isAllPlaced === false" class="start-block-alert">
          Для начала игры разместите все корабли!
        </p>

        <p v-if="isStartingGame" class="text-warning loading-anim">
          Ожидание противника...
        </p>
      </div>
    </div>
    <ShipPlacementBlock
        :cellsArray="cells"
        :ship-counter="shipCounter"
        :shipsArray="ships"
        class="col-12 col-xl-8"
    />

  </div>

</template>

<style lang="scss" scoped>
.btn-start-game {
  padding: calc(var(--game-grid-cell-size) / 4);
  font-size: calc(1.1rem + 0.5vw);
}

.start-block {
  height: 100px;

  .start-block-alert {
    margin: 0;
    padding: 0;
    color: $important-color;
    font-size: calc(0.9rem + 0.5vw);
  }

}

.rival-block {
  padding: 10px 20px;
  background-color: lighten($background-color, 10%);
  border-radius: 10px;

  .rival-data {
    cursor: pointer;
  }
}



$avatarSize: 60px;

.avatar {
  border-radius: 25%;
  border: 2px solid $main-color;
  width: $avatarSize;
  height: $avatarSize;
  background: white;
}

</style>
