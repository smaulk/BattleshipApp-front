<script setup lang="ts">

</script>

<template>
    <ul class="dropdown-menu dropdown-menu-lg-end">
        <li>
            <button
                class="button menu-button"
            >
                Настройки
            </button>
        </li>
        <li>
            <button
                class="button menu-button"
                @click="this.$router.push({name: 'Logout'})"
            >
                Выход
            </button>
        </li>
    </ul>
</template>

<style scoped lang="scss">
ul li {
    padding: 0 8px;
}
   .menu-button {
        width: 100%;
        border-radius: 5px;
        font-size: calc($font-size-header/1.2);
        padding: 5px 0;
        transition: all 0.2s;
        color: $third-color;
        background-color: white;

        &:hover {
            background-color: $header-second-color;
            color: $header-main-color;
        }
    }


</style>
