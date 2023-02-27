<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
    defineProps<{
        modelValue?: any;
    }>(),
    {
    }
);

const emits = defineEmits<{
    (e: 'change', value: any): void;
    (e: 'update:modelValue', value: any): void;
}>();


function handleChange(e: any) {
  emits('change', e.target.value)
}
</script>

<template>
  <div class="simple-select">
    <select class="simple-select_inner" v-bind="$attrs" @change="handleChange" :value="modelValue">
    <!-- -->
      <slot></slot>
    </select>
    <i-akar-icons-triangle-down />
  </div>
</template>

<style lang="postcss">
.simple-select {
  @apply border-1 rounded border-gray-400 dark:border-gray-700
      relative
    text-gray-600 dark:text-gray-400;
  
  & svg {
    @apply absolute right-1 top-1/2 -mt-2 text-gray-400;
  }
}

.simple-select_inner {
  @apply h-full w-full pl-4 pr-6 items-center flex min-w-20 cursor-pointer;
}
</style>
