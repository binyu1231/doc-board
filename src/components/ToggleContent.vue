<script lang="ts" setup>
defineProps<{
  title?: string,
  level?: number
}>()
</script>
<template>
<ScopeToggle v-slot="{ toggle, value }" :default-value="false">
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