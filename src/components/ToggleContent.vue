<script lang="ts" setup>
defineProps<{
  title?: string
}>()
</script>
<template>
<ScopeToggle v-slot="{ toggle, value }" :default-value="true">
<ColTitle @click="toggle" :expand="value">{{ title }}</ColTitle>

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