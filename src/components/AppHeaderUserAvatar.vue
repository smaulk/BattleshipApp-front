<script setup lang="ts">
import { computed } from "vue";
import { userAvatar } from "@/game.config.ts";

const { img } = defineProps({
  img: String,
});

const avatar = computed(() => img || userAvatar)
</script>

<template>
  <div>
    <img
        :src="avatar"
        alt=""
        class="avatar not-highlight"
    />
  </div>
</template>

<style scoped lang="scss">
$avatarSize: 55px;

.avatar {
  border-radius: 25%;
  border: 2px solid $main-color;
  width: $avatarSize;
  height: $avatarSize;
  background: white;
}
</style>
