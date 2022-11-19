<script lang="ts" setup>
import { stateMap } from './type'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    race?: string[]
  }>(),
  { 
    race: () => []
  }
);
const primary = computed(() => {
  const race = props.race?.[0] || ''
  return { name: race.replace(/\d+$/, '') || '', score: race.match(/\d+$/)?.[0] || '' }
})

const secondary = computed(() => {
  const race = props.race?.[1] || ''
  return { name: race.replace(/\d+$/, '') || '', score: race.match(/\d+$/)?.[0] || '' }
})

</script>
<template>
<div class="battle-calendar-race" v-if="race.length">
  <Icon 
    :icon="`circle-flags:${primary.name}`" 
    class="battle-calendar-icon primary" /> 
  <Icon
    :icon="`circle-flags:${secondary.name}`"
    class="battle-calendar-icon secondary" /> 
  <div class="bcr-content">
    <span :class="{ 'win': primary.score > secondary.score }">
      {{ stateMap[primary.name]?.[0] }}
      <span class="2xl:ml-1">{{ primary.score }}</span>
    </span>
    <span :class="{ 'win': secondary.score > primary.score }">
      <span class="2xl:mr-1">{{ secondary.score }}</span>
      {{ stateMap[secondary.name]?.[0] }}
    </span>
  </div>
</div>
<div v-else class="battle-calendar-empty">
  <span>{{ '\u00A0' }}</span>
</div>
</template>
<style lang="postcss">
.battle-calendar-race {
  @apply
    flex-1 md:h-6
    text-xs  border-box whitespace-nowrap relative 
    bg-slate-100 dark:bg-slate-800 
    text-slate-900 dark:text-slate-200 text-shadow-sm 
    overflow-hidden
    py-1 xl:px-1 2xl:px-4 
    rounded;
}

.battle-calendar-empty {
  @apply flex-1 h-6;
}

.battle-calendar-icon {
  @apply absolute text-4xl opacity-25;

  &.primary {
    @apply md:-left-4 -top-3;
  }

  &.secondary {
    @apply -bottom-3 md:bottom-auto md:-right-4 md:-top-3;
  }
}

.bcr-content {
  @apply 
    w-auto h-full flex flex-col
    relative px-1 md:flex-row md:w-full md:h-auto z-10 
    justify-between items-center;

  & > span {
    @apply write-vertical-right text-center md:write-normal;
    &.win {
      @apply text-pink-6 dark:text-pink-4;
    }
  }
}

</style>
