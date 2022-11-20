<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { stateMap } from './type'

const props = defineProps<{
  state: string,
  win?: boolean
}>()

const stateKey = computed(() => {
  return `circle-flags:${props.state}`
});

const stateName = computed(() => {
  return stateMap[props.state]
})

</script>
<template>
  <div class="state-card" :class="{ win }">
    <div class="state-card-content">
      <Icon :icon="props.state ? stateKey : ''" class="icon" /> 
      <div>
        <div class="state-name">
          {{ stateName[0] }}
          <span>
            <slot name="rank"></slot>
          </span>
        </div>
        <div class="state-en">{{ stateName[1] }}</div>
      </div>
    </div>
    <div class="state-card-slot">
      <slot />
    </div>
  </div>
</template>
<style lang="postcss">
.state-card {
  @apply flex flex-col border-1 rounded border-slate-200 dark:border-slate-600 flex-1;
}
.state-card-content {
  @apply
    inline-flex items-center pl-4 py-2 gap-2 ;

    & > .icon {
      @apply w-7 h-7 mr-1;
    }

    &.win {
      @apply border-slate-400 dark:border-slate-500
      
      bg-violet-100 dark:bg-slate-800;
    }
}

.state-name {
  @apply font-semibold whitespace-nowrap;

  & span {
    @apply text-xs font-medium text-slate-400 dark:text-slate-600;
  }
}

.state-en {
  @apply text-sm text-slate-500 dark:text-slate-600 whitespace-nowrap;
}

.state-card-slot {
}

.battle-card-rank {
  @apply lg:text-sm xl:text-base text-right flex-1 pr-4 font-semibold whitespace-nowrap;

  & > span {
    @apply lg:hidden xl:inline-block ;
  }
}
</style>
