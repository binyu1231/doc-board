<script lang="ts" setup>
withDefaults(
  defineProps<{
    variables?: any
  }>(),
  {
    variables: () => ({})
  }
)
</script>
<template>
<slot v-bind="variables"></slot>
</template>
<style lang="postcss">
.scope {
  @apply;
}
</style>