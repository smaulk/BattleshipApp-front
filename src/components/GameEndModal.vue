<script lang="ts" setup>
import { GameStatus } from "@/enums/GameStatus.ts";
import { computed } from "vue";

const { gameStatus } = defineProps<{
  gameStatus: GameStatus,
}>();

const gameInfoClass = computed(() => {
  return gameStatus === GameStatus.WIN ? 'modal-win' : 'modal-lost'
})

const gameInfoMessage = computed(() => {
  return gameStatus === GameStatus.WIN ? '🏆 Вы победили!' : '😞 Вы проиграли'
})

</script>

<template>
  <div class="overlay">
    <div :class="['game-end-modal', gameInfoClass]">
      <div class="modal-content">
        <p>{{ gameInfoMessage}}</p>
      </div>

      <div class="modal-buttons">
        <button class="btn" @click="$router.push({name: 'home'})">На главную</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.game-end-modal {
  padding: 3rem;
  border-radius: 16px;
  text-align: center;
  background-color: $background-color;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  animation: slideIn 0.4s ease;
  color: #fff;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &.modal-win {
    background: linear-gradient(145deg, #27e719, #4eb015);
    box-shadow: inset 0 0 12px rgba(0, 255, 100, 0.5);
    animation: pulseWin 1.5s infinite;

    @keyframes pulseWin {
      0%, 100% {
        transform: scale(1);
        box-shadow: inset 0 0 12px rgba(0, 255, 100, 0.5);
      }
      50% {
        transform: scale(1.02);
        box-shadow: inset 0 0 20px rgba(0, 255, 100, 0.7);
      }
    }
  }

  &.modal-lost {
    background: linear-gradient(145deg, #f44336, #ff7961);
    box-shadow: inset 0 0 12px rgba(255, 0, 50, 0.5);
  }

  .modal-content {
    font-size: calc(2.8rem + 1vw);
    font-weight: bold;
    text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
  }

  .modal-buttons {
    display: flex;
    justify-content: center;

    button {
      padding: 15px 25px;
      font-size: 1.4rem;
      font-weight: bold;
      border-radius: 10px;
      background-color: #333;
      color: #fff;
      transition: all 0.3s ease;

      &:hover {
        background-color: #555;
        transform: scale(1.05);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>