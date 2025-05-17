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
import NotifyService from "@/services/NotifyService.ts";

const router = useRouter();

const props = defineProps<{
  isBotGame: boolean,
  isLinkMode: boolean,
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

const onCopyUrl = () => {
  const url = window.location.href
  navigator.clipboard.writeText(url)
      .then(() => {
        NotifyService.success('Ссылка скопирована в буфер обмена!');
      }).catch(() => {
        NotifyService.error('Ошибка при копировании ссылки');
      })
}
</script>

<template>
  <div class="row row-cols-1 row-cols-xl-2 d-flex justify-content-center justify-content-xl-between py-3 gap-4 gap-lg-5 gap-xl-0">
    <div class=
             "col-10 col-xl-4 d-flex flex-column flex-lg-row flex-xl-column
             align-items-center align-items-lg-start align-items-xl-center justify-content-center gap-xl-2"
    >
      <div v-if="isBotGame" class="text-center">
        <p class="h2">Игра с ботом</p>
        <p v-if="difficultyLevel" class="h6 text-info">
          Уровень сложности: {{ DifficultyLevelRU[difficultyLevel as DifficultyLevel] }}
        </p>
      </div>

      <div v-else class="d-flex flex-column">
        <button v-if="isLinkMode" class="mb-3 btn btn-light" @click="onCopyUrl">
          Скопировать ссылку
        </button>
        <Countdown :time-left="roomTtl"/>
        <div v-if="rival"
             class="d-flex justify-content-center align-items-center gap-4 mb-3 mb-lg-0 mb-xl-5 rival-block not-highlight">
          <span class="h6">Противник</span>
          <div class="d-flex align-items-center gap-3 rival-data" @click.prevent="onClickUser(rival.id)">
            <img :src="avatar" alt="avatar" class="avatar"/>
            <div>
              {{ rival.nickname }}
            </div>
          </div>
        </div>

        <div v-else class="h7 loading-anim">
          Ожидание подключения противника...
        </div>
      </div>

      <div class=
               "col-12 col-sm-10 col-lg-6 col-xl-12 d-flex flex-column
               align-items-center start-block"
      >
        <p class="h2">Разместите корабли</p>

        <div class="col-10 col-sm-8 col-xl-9 mb-2 mb-xl-3">
          <button
              class="btn-u btn-start-game"
              @click="startGameClick"
              :disabled="isStartingGame"
          >
            Начать игру
          </button>
        </div>

        <p v-if="isAllPlaced === false" class="text-important h6 mb-0">
          Для начала игры разместите все корабли!
        </p>

        <p v-if="isStartingGame" class="text-warning loading-anim h7 mb-0">
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

$rival-bg: lighten($background-color, 10%);
$rival-hover: darken($rival-bg, 3%);
$avatar-size: 60px;

.rival-block {
  padding: 12px 24px;
  background-color: $rival-bg;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.03);
    background-color: $rival-hover;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }

  .rival-data {
    cursor: pointer;
    font-size: 1.4rem;
    transition: color 0.2s;

    &:hover {
      transform: scale(1.03);
    }
  }
}

.avatar {
  border-radius: 25%;
  border: 3px solid $main-color;
  width: $avatar-size;
  height: $avatar-size;
  background: white;
  transition: transform 0.2s;
}
</style>
