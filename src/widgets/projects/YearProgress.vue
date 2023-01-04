<script lang="ts" setup>
const year = new Date().getFullYear()
const start = new Date(`${year}-01-01 00:00:00`).getTime()
const end = new Date(`${year}-12-31 23:59:59`).getTime()
const now = new Date().getTime()
const total = end - start
const pass = now - start
const rate = (pass / total * 100).toFixed(2) + '%'
</script>

<template>
  <div class="year-progress">
    <!-- -->

    <div class="year-progress-bar"></div>
    <div class="year-progress-word">{{ year }} Year Passed. {{ rate }}</div>
  </div>
</template>

<style lang="postcss">
.year-progress {
  @apply relative h-8 border-1 rounded dark:border-slate-700 border-slate-200;
}

.year-progress-bar {
  @apply absolute left-0 top-0 bottom-0 z-10
  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500;
  width: v-bind(rate);
}

.year-progress-word {
  @apply absolute inset-0 z-20 flex justify-end items-center px-4;
}
</style>
