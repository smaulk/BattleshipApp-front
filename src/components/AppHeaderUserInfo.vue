<script setup lang="ts">
import HeaderUserAvatar from "components/AppHeaderUserAvatar.vue";
import {onBeforeMount, reactive} from "vue";
import HeaderUserMenu from "components/AppHeaderUserMenu.vue";
import axios from "axios";


const userData = reactive({
    username: 'undefined',
    avatar_path: '',
});
const getUserData = () => {
    axios.get('/api/v1/user')
        .then(response => {
            userData.username = response.data.name;
            userData.avatar_path = response.data.avatar_path;
        })
}

onBeforeMount(() => {
    getUserData();
});

</script>

<template>
    <div>
        <div class="user-info">
            <HeaderUserAvatar :img="userData.avatar_path"/>
            <h1 class="user-name not-highlight">
                {{userData.username}}
            </h1>
        </div>
        <HeaderUserMenu />
    </div>
</template>

<style scoped lang="scss">

.user-info {
    display: flex;
    width: 150px;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    padding: 0 10px;
    transition: all 0.3s;


    .user-name {
        width: 100%;
        color: $header-main-color;
        font-size: $font-size-header;

    }

    * {
        z-index: 1;
    }

    &:hover{
        .user-name {
            color: $header-second-color;
        }
    }
}

</style>
