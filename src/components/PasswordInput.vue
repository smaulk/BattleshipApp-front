<script setup lang="ts">
import { ref, computed } from 'vue';

defineProps<{
  modelValue: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  minlength?: number;
}>();

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const showPassword = ref(false);

const inputType = computed(() => (showPassword.value ? 'text' : 'password'));

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>

    <div class="position-relative">
      <input
          :id="id"
          class="form-control h7 pe-5"
          :type="inputType"
          :value="modelValue"
          @input="updateValue"
          :placeholder="placeholder"
          :required="required"
          :minlength="minlength"
      />
      <button
          type="button"
          class="btn btn-link password-toggle"
          @click="togglePasswordVisibility"
          tabindex="-1"
      >
        <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
             viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8z"/>
          <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
             viewBox="0 0 16 16">
          <path d="M13.359 11.238a9.67 9.67 0 0 0 2.014-3.238S12.5 2.5 8 2.5c-.98 0-1.9.19-2.739.528l1.348 1.348A3.996 3.996 0 0 1 8 5c1.657 0 3 1.343 3 3 0 .429-.09.837-.252 1.207l1.61 1.61z"/>
          <path d="M2.354 1.646a.5.5 0 0 1 .707 0l12 12a.5.5 0 0 1-.707.708l-1.909-1.91A9.61 9.61 0 0 1 8 13.5c-5 0-8-5.5-8-5.5a15.06 15.06 0 0 1 4.087-3.905l-1.733-1.733a.5.5 0 0 1 0-.707z"/>
        </svg>
      </button>
    </div>
</template>

<style scoped>
.password-toggle {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  padding: 0;
  border: none;
  background: transparent;
  color: #484b4f;
}
</style>