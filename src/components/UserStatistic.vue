<script setup lang="ts">
import { Statistic } from "@/interfaces/User.ts";

defineProps<{
  statistic: Statistic
}>()
</script>

<template>
  <div class="statistic card p-3">
    <h4 class="mb-3">Статистика</h4>
    <table class="table table-bordered mb-0">
      <tbody>
      <tr>
        <th class="w-50 text-start">Игры</th>
        <td class="text-end">{{ statistic.games }}</td>
      </tr>
      <tr>
        <th class="text-start">Победы</th>
        <td class="text-end text-success">{{ statistic.wins }}</td>
      </tr>
      <tr>
        <th class="text-start">Поражения</th>
        <td class="text-end text-danger">{{ statistic.losses }}</td>
      </tr>
      <tr>
        <th class="text-start">Ничьи</th>
        <td class="text-end text-secondary">{{ statistic.draws }}</td>
      </tr>
      <tr>
        <th class="text-start">Очки</th>
        <td class="text-end fw-bold">{{ statistic.points }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.statistic {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
}
</style>