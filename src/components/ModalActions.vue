<script setup lang="ts">

const emit = defineEmits<{
  (event: 'confirm'): void | Promise<void>;
  (event: "reject"): void;
}>();

const confirm = async () => {
  emit('confirm');
};

const reject = () => {
  emit('reject')
}

</script>

<template>
  <div class="modal-actions">
    <button class="btn-u h7" @click="confirm">Ок</button>
    <button class="btn-cancel h7" @click="reject">Отмена</button>
  </div>
</template>

<style scoped lang="scss">
.modal-actions {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style>