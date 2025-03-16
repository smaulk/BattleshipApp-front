<script lang="ts" setup>
import { DifficultyLevel, DifficultyLevelRU } from "@/enums/DifficultyLevel.ts";
</script>

<template>
  <div class="d-flex flex-column align-items-center py-3 gap-4">
    <div class="mb-5">
      <p class="h1 text-center">Играть в морской бой</p>
    </div>

    <div class="col-12 d-flex flex-column">
      <div class="d-flex justify-content-center pt-3">
        <p class="h3">Выберите уровень сложности</p>
      </div>

      <div class="d-flex align-items-center justify-content-around">
        <div class="difficulty-btns col-10 col-sm-8 col-lg-6 col-xl-4 d-flex flex-column align-items-center gap-3">
          <button
              class="btn-u"
              @click="$router.push({name: 'game', query: {difficulty: DifficultyLevel.Easy}})"
          >
            {{ DifficultyLevelRU[DifficultyLevel.Easy] }}
          </button>
          <button
              class="btn-u"
              @click="$router.push({name: 'game', query: {difficulty: DifficultyLevel.Normal}})"
          >
            {{ DifficultyLevelRU[DifficultyLevel.Normal] }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.difficulty-btns {
  button {
    font-size: calc(1.6rem + 0.4vw);
    padding: 10px;
  }
}
</style>
