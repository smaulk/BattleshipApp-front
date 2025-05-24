<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import GameStartBlock from "components/GameStartBlock.vue";
import GameProcessBlock from "components/GameProcessBlock.vue";
import { useRoute } from "vue-router";
import { DifficultyLevel } from "@/enums/DifficultyLevel.ts";
import { getEcho } from "@/helpers/socket.ts";
import { useLoading } from "@/composables/Loading.ts";
import { joinRoom } from "@/services/RoomApiService.ts";
import { startGame } from "@/services/GameApiService.ts";
import { GameMode } from "@/enums/GameMode.ts";
import { CreateGame, EndGame } from "@/interfaces/Socket.ts";
import NotifyService from "@/services/NotifyService.ts";
import { ColRowData } from "@/interfaces/ColRowData.ts";
import { ShotData } from "@/interfaces/ShotData.ts";
import { ShipData } from "@/interfaces/ShipData.ts";
import { CellsMatrix } from "@/interfaces/CellsMatrix.ts";
import { getInteger } from "@/helpers";
import { UserInfo } from "@/interfaces/User.ts";
import { useCountdown } from "@/composables/Countdown.ts";

const route = useRoute();
const { unique } = useLoading();

const { timeLeft, startCountdown } = useCountdown();

const storedUserId = localStorage.getItem('userId');
const userId = ref<number | null>(getInteger(storedUserId));

const gameMode = (route.query.mode?.toString() as GameMode | undefined) || GameMode.BOT;
const roomId: string | null = route.query.roomId?.toString() || null;
let gameId: number | null = null;

// Определяем режим
const isBotMode = computed(() => gameMode == GameMode.BOT);
const isRoomMode = computed(() => (gameMode == GameMode.ONLINE || gameMode == GameMode.LINK) && roomId !== null);
let isGameMode: boolean = false;

const getDifficultyLevel = () => {
  if (isBotMode.value) {
    return route.query.difficulty === DifficultyLevel.Easy
        ? DifficultyLevel.Easy
        : DifficultyLevel.Normal;
  }

  return null;
}

const isAvailable = ref<boolean>(isBotMode.value || isRoomMode.value);

onMounted(async () => {
  setGameMode(true);

  if (isRoomMode.value && roomId) {
    const roomTtl = await joinRoom(roomId);
    if (roomTtl !== null) {
      startCountdown(roomTtl);
      connectChannelRoom(roomId);
    } else {
      isAvailable.value = false;
    }
  }
  startGameplay();
});

const rivalInfo = ref<UserInfo | null>(null);

const connectChannelRoom = (roomId: string): void => {
  getEcho()
      .join(`rooms.${roomId}`)
      .here((users: Array<UserInfo>) => {
        if (users.length === 2) {
          rivalInfo.value = users.find(user => user.id !== userId.value) || null;
        }
      })
      .joining((user: UserInfo) => {
        NotifyService.info('Подготовка к игре', 'Противник подключился к комнате')
        rivalInfo.value = user;
      })
      .leaving(() => {
        NotifyService.info('Подготовка к игре', 'Противник покинул комнату')
        rivalInfo.value = null;
      })
      .listen('.create.game', async (data: CreateGame): Promise<void> => {
        onCreateGame(data.gameId, data.firstPlayerId);
        NotifyService.success('Игра началась!');
      })
}

const leaveChannelRoom = (roomId: string): void => {
  getEcho().leave(`rooms.${roomId}`);
}

let isFirstPlayer: boolean | null = null;

const onCreateGame = (newGameId: number, firstPlayerId: number) => {
  gameId = newGameId;
  isFirstPlayer = userId.value === firstPlayerId;
  isGameMode = true;
  startGameplay();
}

const difficultyLevel: DifficultyLevel | null = getDifficultyLevel();


let gameIsStarted = ref(false)

let cellsArray: CellsMatrix = []
let shipsArray: Array<ShipData> = []

const onStartGame = async (cells: CellsMatrix, ships: Array<ShipData>): Promise<boolean> => {
  cellsArray = cells;
  shipsArray = ships;

  if (isBotMode.value) {
    startBotGame();
    return true;
  }

  return await startOnlineGame();
}

const startOnlineGame = async (): Promise<boolean> => {
  return await unique(async (): Promise<boolean> => {
    return isRoomMode.value && roomId !== null && await startGame(roomId);
  }, false)
}

const startBotGame = () => {
  gameIsStarted.value = true;
}


/** Вывод предупреждения при выходе со страницы или ее обновлении */
const updateAlert = (e: Event) => {
  (e || window.event).returnValue = true;
}

const startGameplay = () => {
  if (isGameMode && gameId) {
    if (roomId) {
      leaveChannelRoom(roomId)
    }

    connectChannelGame(gameId)
    gameIsStarted.value = true;
  }
}

const connectChannelGame = (gameId: number): void => {
  getEcho()
      .join(`games.${gameId}`)
      .listenForWhisper('game.move.data', (data: {userId: number, cell: ColRowData}) => {
        if(data.userId == userId.value) return;
        gameProcessRef.value?.onGetRivalMove(data.cell);
      })
      .listenForWhisper('game.move.result', (data: ShotData) => {
        gameProcessRef.value?.onGetRivalResult(data);
      })
      .leaving(() => {
        gameProcessRef.value?.onLeaveRival();
      })
      .listen('.end.game', async (data: EndGame): Promise<void> => {
        if (data.status) {
          NotifyService.success('Игра успешно завершена!');
        } else {
          NotifyService.error('Ошибка при завершении игры');
        }

        gameProcessRef.value?.onEndGame(data.status);
      });
}

const gameProcessRef = ref<typeof GameProcessBlock | null>(null);

onUnmounted(() => {
  if (roomId) {
    leaveChannelRoom(roomId);
  }
  setGameMode(false);
});

const setGameMode = (isGameMode: boolean): void => {
  window.removeEventListener('beforeunload', updateAlert);
  if (isGameMode) {
    window.addEventListener('beforeunload', updateAlert);
  }

  NotifyService.setIsGameMode(isGameMode);
}

</script>

<template>
  <div v-if="isAvailable">
    <GameProcessBlock ref="gameProcessRef"
                      v-if="gameIsStarted"
                      :is-bot-game="isBotMode"
                      :difficulty-level="difficultyLevel"
                      :game-id="gameId"
                      :user-id="userId"
                      :is-first-player="isFirstPlayer"
                      :cells="cellsArray"
                      :ships="shipsArray"
    />
    <GameStartBlock v-else
                    :is-bot-game="isBotMode"
                    :is-link-mode="gameMode == GameMode.LINK"
                    :rival="rivalInfo"
                    :difficulty-level="difficultyLevel"
                    :start-game="onStartGame"
                    :room-ttl="timeLeft"
    />
  </div>
  <div v-else class="d-flex flex-column justify-content-center align-items-center text-center">
    <div class="message-block">
      <h2 class="text-important h2">Игра недоступна!</h2>
      <p class="text-muted h6">Игра закончилась или недоступна</p>
      <button class="btn btn-primary mt-3" @click="$router.push({name: 'home'})">На главную</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-block {
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>