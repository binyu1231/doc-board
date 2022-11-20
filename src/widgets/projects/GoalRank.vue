<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { stateMap } from './type';

defineProps<{
  rank: string,
  name: string,
  state: string,
  goals: string,

}>()
</script>
<template>
<div class="goal-rank">
  <span class="goal-rank-no">No.{{ rank }}</span>
  <span class="goal-rank-state">
    <Icon :icon="`circle-flags:${state}`"></Icon>
  </span>
  <span class="goal-rank-name">
    {{ name }}
    <small>{{ stateMap[state]?.[0] }}</small>
  </span>
  <span class="goal-rank-count">{{ goals }}</span>
</div>
</template>
<style lang="postcss">
.goal-rank {
  @apply flex text-xl w-full mx-auto border-b border-slate-400 md:w-2xl xl:w-3xl;
}

.goal-rank-no {
  @apply font-semibold mr-4;
}

.goal-rank-state {
  @apply text-2xl mr-4;
}

.goal-rank-name {
  @apply flex-1;

  & small {
    @apply text-sm text-slate-600;
  }
}

.goal-rank-count {
  @apply font-semibold text-xl;
}
</style>