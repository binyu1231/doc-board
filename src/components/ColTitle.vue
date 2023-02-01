<script lang="ts" setup>
defineProps<{
  expand?: boolean
}>()
</script>
<template>
<h3 class="col-title">
  <slot />

  <i-ant-design-caret-down-filled v-if="expand === false" />
  <i-ant-design-caret-up-filled v-else-if="expand === true "/>
</h3>
</template>
<style lang="postcss">
.col-title {
  @apply flex justify-between items-center cursor-pointer p-1 rounded-sm hover:bg-violet-100 hover:dark:bg-violet-900
    transition;
}
</style>