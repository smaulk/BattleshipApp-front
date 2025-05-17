<script lang="ts" setup>
import Battlefield from "components/Battlefield.vue";
import { onMounted, onUnmounted, ref } from "vue";
import ShipPlacementService from "@/services/ShipPlacementService.ts";
import Ship from "components/Ship.vue";
import BotService from "@/services/BotService.ts";
import GameDisplayService from "@/services/GameDisplayService.ts";
import CellCreatorService from "@/services/CellCreatorService.ts";
import ShipsCounterService from "@/services/ShipsCounterService.ts";
import { GameStatus, getGameTypeByStatus } from "@/enums/GameStatus.ts";
import GameEndModal from "components/GameEndModal.vue";
import { DifficultyLevel, DifficultyLevelRU } from "@/enums/DifficultyLevel.ts";
import RivalShipsContainer from "components/RivalShipsContainer.vue";
import { BattlefieldData } from "@/interfaces/BattlefieldData.ts";
import { ShipData } from "@/interfaces/ShipData.ts";
import ShotService from "@/services/ShotService.ts";
import { BotGameHandlerService } from "@/services/BotGameHandlerService.ts";
import { ColRowData } from "@/interfaces/ColRowData.ts";
import { OnlineGameHandlerService } from "@/services/OnlineGameHandlerService.ts";
import RivalService from "@/services/RivalService.ts";
import { ShotData } from "@/interfaces/ShotData.ts";
import { getEcho } from "@/helpers/socket.ts";
import { finishGame } from "@/services/GameApiService.ts";
import { CellsMatrix } from "@/interfaces/CellsMatrix.ts";

const { isBotGame, difficultyLevel, gameId, isFirstPlayer, cells, ships} = defineProps<{
  isBotGame: boolean,
  difficultyLevel: DifficultyLevel | null,
  gameId: number | null,
  isFirstPlayer: boolean | null,
  cells: CellsMatrix,
  ships: Array<ShipData>,
}>();

const selfCellElements = ref();
const rivalCellElements = ref();

const battlefieldSelf = ref();
const battlefieldRival = ref();

const battlefieldData: BattlefieldData = { cells, ships }

let shipPlacementService: ShipPlacementService;
let gameDisplay: GameDisplayService;
let gameHandler: BotGameHandlerService | OnlineGameHandlerService;
const rivalShipsCounter: ShipsCounterService = new ShipsCounterService();

onMounted(() => {
  shipPlacementService = new ShipPlacementService(new CellCreatorService(selfCellElements.value));
  shipPlacementService.placeShipsFromCells(battlefieldData);
  gameDisplay = new GameDisplayService(
      rivalShipsCounter,
      new CellCreatorService(rivalCellElements.value),
      new CellCreatorService(selfCellElements.value),
      battlefieldSelf.value,
      battlefieldRival.value
  );

  if(isBotGame) {
    gameHandler = new BotGameHandlerService(gameDisplay, new ShotService(battlefieldData), new BotService(difficultyLevel));
  } else {
    gameHandler =  new OnlineGameHandlerService(gameDisplay, new ShotService(battlefieldData), new RivalService(gameId));
    gameHandler.setIsUserMove(isFirstPlayer === true);
  }

  rivalCellElements.value.forEach((cell: HTMLDivElement) => {
    cell.addEventListener('click', onClickRivalCell);
  })

})

const gameStatusResult = ref<GameStatus>(GameStatus.IN_PROGRESS);
const gameStatus = ref<GameStatus>(GameStatus.IN_PROGRESS);

const onLeaveRival = (): void => {
  if(gameStatusResult.value === GameStatus.IN_PROGRESS) {
    gameStatusResult.value = GameStatus.WIN;
  }
}

const onGetRivalMove = async (data: ColRowData): Promise<void> => {
  const status = await (gameHandler as OnlineGameHandlerService).setShot(data);
  if (status) onFinishGame(status);
}

const onGetRivalResult = async (data: ShotData): Promise<void> => {
  const status = await (gameHandler as OnlineGameHandlerService).setResult(data);
  if (status) onFinishGame(status);
}

const onFinishGame = (status: GameStatus) => {
  gameStatus.value = status;
  const gameType = getGameTypeByStatus(status);
  if (gameType !== null && gameId) {
    finishGame(gameId, gameType);
  }
}

const onEndGame = (isEnded: boolean) => {
  if (isEnded) {
    gameStatusResult.value = gameStatus.value;
  }
}

defineExpose({ onLeaveRival, onGetRivalMove, onGetRivalResult, onEndGame })

/**
 * Обработка нажатия на клетку противника.
 */
const onClickRivalCell = (event: Event) => {
  isBotGame ? onClickBotRivalCell(event) : onClickOnlineRivalCell(event);
}

const onClickOnlineRivalCell = (event: Event) => {
  (gameHandler as OnlineGameHandlerService).sendShot(event.target as HTMLDivElement);
}

const onClickBotRivalCell = async (event: Event) => {
  const status: GameStatus | null = await (gameHandler as BotGameHandlerService).shot(event.target as HTMLDivElement);
  // Для бота сразу записывает в результат игры
  if (status) gameStatusResult.value = status;
}


const getRivalShipsRemainingCount = (size: number): number => {
  return rivalShipsCounter.getRemainingCount(size);
}

onUnmounted(() => {
  getEcho().leave(`games.${gameId}`);
})

</script>

<template>
  <div class="py-3 py-xxl-0">
    <div v-if="isBotGame && difficultyLevel">
      <p class="h6">Уровень сложности: {{ DifficultyLevelRU[difficultyLevel as DifficultyLevel] }}</p>
    </div>

    <div class="d-flex justify-content-center row gap-4 gap-xl-0">

      <div ref="battlefieldSelf"
           class="battlefield__self battlefield__wait col-12 col-xl-6 col-xxl-5">
        <p class="h2 text-center not-highlight">Ваше поле</p>
        <Battlefield v-model:cells="selfCellElements"/>
        <Ship v-for="ship in ships"
              :ship-data="ship"
              class="static"
        />
      </div>

      <div
          ref="battlefieldRival"
          class="battlefield__rival col-12 col-xl-6 col-xxl-7 d-flex justify-content-center align-items-center
           mx-0 gap-3 row">
        <div class="col-12 col-sm-8 col-lg-7 col-xl-12 col-xxl-7">
          <p class="h2 text-center not-highlight">Поле противника</p>
          <Battlefield v-model:cells="rivalCellElements"/>
        </div>
        <RivalShipsContainer :get-remaining-count="getRivalShipsRemainingCount" class="col"/>
      </div>

      <GameEndModal v-if="gameStatusResult !== GameStatus.IN_PROGRESS" :game-status="gameStatusResult"/>
    </div>
  </div>

</template>

<style lang="scss">
.battlefield__rival {
  .battlefield-cell__empty {
    cursor: pointer;

    &:hover {
      background-color: #f5cf8f;
    }
  }
}

</style>