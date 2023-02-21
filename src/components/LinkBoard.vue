<script lang="ts" setup>
defineProps<{
    title?: string
}>()
</script>

<template>
  <div class="link-board">
    <!-- -->
    <h2 v-if="title">{{ title }}</h2>
    TODO

    <div class="link-board-container">
        <slot></slot>
    </div>
  </div>
</template>

<style lang="postcss">
.link-board {
  @apply rounded;
}
</style>
