<script lang="ts" setup>
import shortcut from '@/meta/short.json'
</script>
<template>
<div class="home mk">

  <YearProgress />
  <div class="home-container">
    <div 
      v-for="kind in shortcut"
      :key="kind.id"
      class="home-kind-card"
    >
      <h2>{{ kind.name }}</h2>

      <div class="home-dir-container">
        <div v-for="dir in kind.children" :key="dir.name">
          <router-link
            class="home-default-link"
            :to="'/' + dir.children[0].value">
            {{ dir.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style lang="postcss">
.home-container {
  @apply grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 pt-4;
}

.home-kind-card {
  @apply border-1 px-4 pt-2 pb-4 rounded dark:border-slate-700 border-slate-200;

  & h2 {
    @apply mb-2 pt-2;
  }
}

.home-dir-container {
  @apply grid grid-cols-2 gap-x-4;
}

.home-default-link {
  @apply block  px-2 py-1 rounded-1;

  &:hover {
    @apply bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-slate-100;
  }
}


</style>