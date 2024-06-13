<script setup lang="ts">
import Notify from "@/composables/Notify.ts";
import { NotifyType } from "@/enums/NotifyType.ts";

</script>

<template>
  <div class="notification-container">
    <transition-group name="notify-animate">
      <div
          class="notification"
          v-for="notify in Notify.messages"
          :class="notify.type"
          :key="notify.id"
          @pointerover="notify.clearTimeout()"
          @pointerleave="notify.setTimeout()"
      >
        <div class="notification-header">
          <strong>{{notify.title}}</strong>
          <button
              class="btn-close"
              :class="notify.type === NotifyType.Success ? 'btn-close-white' : ''"
              @click="notify.remove()"
          ></button>
        </div>

        <div class="notification-body">
          <span>{{notify.text}}</span>
        </div>

      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.notification-container{
  position: fixed;
  right: 10px;
  bottom: 10px;

  display: flex;
  flex-direction: column;
  gap: 15px;


  .notification{
    width: 300px;
    min-height: 80px;
    border-radius: 5px;
    padding: 5px 10px;
    position: relative;

    &.error{
      background-color: $notify-error;
      color: text-color($notify-error);
      .notification-header{
        border-bottom-color: text-color($notify-error);
      }
    }

    &.success{
      background-color: $notify-success;
      color: text-color($notify-success);
      .notification-header{
        border-bottom-color: text-color($notify-success);
      }
    }

    &.info{
      background-color: $notify-info;
      color: text-color($notify-info);
      .notification-header{
        border-bottom-color: text-color($notify-info);
      }
    }

    .notification-header{
      font-size: 18px;
      border-bottom: 1px solid black;
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }

    .notification-body{
      font-size: 16px;
      line-height: 20px;
    }
  }
}


.notify-animate {
  &-enter-active{
    transition: all .5s ease;
  }

  &-leave-active{
    transition: all .5s ease;
  }

  &-enter-from {
    opacity: 0;
    transform: translateX(100%) scale(0.5);
  }
  &-enter-to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  &-leave-from{
    opacity: 1;
  }
  &-leave-to {
    opacity: 0;
  }

  &-move{
    transition: all .5s ease;
  }
}
</style>