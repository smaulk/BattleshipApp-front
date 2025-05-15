<script setup lang="ts">

const modelValue = defineModel<string>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const clear = () => {
  emit('update:modelValue', '');
};

</script>

<template>
  <div class="mb-3">
    <div class="input-group">
      <input
          type="text"
          class="form-control"
          placeholder="Поиск..."
          v-model="modelValue"
      />
      <button v-if="modelValue !== ''" class="btn btn-light bg-white btn-input" type="button" @click="clear">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>