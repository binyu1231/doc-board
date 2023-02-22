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
    (e: 'change'): void;
    (e: 'update:modelValue', value: any): void;
}>();

const innerModel = computed({
    get: () => props.modelValue,
    set: (val) => emits('update:modelValue', val)
});
</script>

<template>
  <div class="simple-select">
    {{  innerModel  }}
    <select class="simple-select_inner" v-bind="$attrs" v-model="innerModel">
    <!-- -->
      <slot></slot>
    </select>
    <i-akar-icons-triangle-down />
  </div>
</template>

<style lang="postcss">
.simple-select {
  @apply border-1 rounded border-gray-400 
      relative
    text-gray-600;
  
  & svg {
    @apply absolute right-1 top-1/2 -mt-2 text-gray-400;
  }
}

.simple-select_inner {
  @apply h-full w-full pl-4 pr-6 items-center flex min-w-20 cursor-pointer;
}
</style>
