<script lang="ts" setup>
  
</script>
<template>
<div class="card-group">
  <slot />
</div>
</template>
<style lang="postcss">
.card-group {
  @apply grid grid-cols-2 md:grid-cols-4 gap-4;
}
</style>