<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { useRoute } from 'vue-router';

const props = withDefaults(
  defineProps<{ metadata: any[] }>(),
  {
    metadata: () => []
  }
)

const emit = defineEmits<{
  (e: 'change', key: string, i: number): void
}>()

const route = useRoute()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const key = ref(props.metadata.length > 0 ? props.metadata[0].name : '')

watch(key, () => {
  emit('change', key.value, props.metadata.findIndex(opt => opt.name === key.value))
})

watch(() => route, () => {

}, { immediate: true })


onMounted(() => {
  console.log(route.path)
  props.metadata.some((meta) => {
    const active = route.path.startsWith('/' + meta.name.toLowerCase())
    if (active) key.value = meta.name
    return active
    console.log(meta, meta.name.toLowerCase())
  })
})

</script>
<template>
  <div class="header">
    <div class="header-bg"></div>
    <div class="header-container">
        <router-link to="/" aria-label="Cruip">
          <Logo width="50" height="50" />
        </router-link>
        <div class="header-select" @click.stop>
          <select v-model="key">
            <option :key="opt.name" v-for="opt in metadata" :value="opt.name">{{ opt.name }}</option>
          </select>
          <i-akar-icons-triangle-down />
        </div>
        <div class="header-search-container">
          <!-- <Search /> -->
        </div>
        <div class="header-theme-switch" @click="() => toggleDark()">
          <i-akar-icons-moon-fill v-if="isDark" />
          <i-akar-icons-sun-fill v-else />
        </div>
      </div>
  </div>
</template>
<style lang="postcss">
.header {
  @apply fixed w-full z-100 flex items-center;
}

.header-bg {
  @apply 
    absolute inset-0 -z-10 
    backdrop-blur bg-opacity-50 dark:bg-opacity-70
    bg-white dark:bg-slate-900 
    border-b border-slate-200 dark:border-slate-800;
}

.header-container {
  @apply w-full px-4 sm:px-6 flex items-center justify-between h-16 md:h-20 gap-2;
}

.header-theme-switch {
  @apply select-none text-xl pt-1;
}

.header-select {
  font-family: lobster;
  @apply text-slate-400 text-lg inline-flex items-center justify-between leading-5 px-1 md:px-3 whitespace-nowrap dark:text-slate-500
  ;
  & select {
    @apply;
  }

  & option {
    box-shadow: 0 0 10px 100px #1882A8 inset;
    @apply py-1 mx-2 text-base text-violet-500 dark:bg-slate-800 dark:text-slate-300 hover:bg-violet;
  }

  & > svg {
    @apply mt-0.5;
  }
}

.header-content {
  @apply ;
}

.header-search-container {
  @apply flex-1;
}
</style>