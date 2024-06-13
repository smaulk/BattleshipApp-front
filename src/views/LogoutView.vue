<script setup lang="ts">
</script>

<template>
    <div class="logout-block pt-5">
        <div class="col-12 col-md-8 col-xl-6 d-flex flex-column align-items-center">
            <p class="h1">Вы уверенны, что хотите выйти?</p>

            <button
                class="btn-u btn-logout">
                Да, выйти
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.logout-block{
  display: flex;
  justify-content: center;
  .btn-logout{
    padding: 15px;
    font-size: 30px;
  }
}
</style>
