<script lang="ts" setup>
withDefaults(defineProps<{
  title?: string,
  level?: number | string,
  expand?: boolean
}>(), {
  expand: false
})
</script>
<template>
<ScopeToggle v-slot="{ toggle, value }" :default-value="expand">
  <ColTitle @click="toggle" :level="level" :expand="value">{{ title }}</ColTitle>

  <div v-if="value">
    <slot />

  </div>

</ScopeToggle>
</template>
<style lang="postcss">
.toggle-content {
  @apply;
}
</style>