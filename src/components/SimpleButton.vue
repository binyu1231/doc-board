<script lang="ts" setup>

</script>

<template>
  <div class="simple-button">
    <!-- -->
    <slot />
  </div>
</template>

<style lang="postcss">
.simple-button {
  @apply 
    cursor-pointer 
    hover:bg-gray-100 dark:hover:bg-gray-800
    border-1 
    border-gray dark:border-gray-700
    text-gray-700 dark:text-gray-400
    rounded px-4 py-2;

    &.active {
        @apply bg-violet-100 dark:bg-violet-900;
    }
}
</style>
