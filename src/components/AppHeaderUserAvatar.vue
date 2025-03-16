<script setup lang="ts">
const {img} = defineProps({
    img: String,
});

</script>

<template>
    <div>
        <img
            :src="img"
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
