<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useNprogress, useAos } from '@/composables'

useHead({
  title: 'Binyu.me',
  meta: [
    { name: 'description', content: 'template' },
  ],
})

useNprogress()
useAos()

</script>

<template>
  <router-view />
</template>

<style scoped>
</style>
