<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue';

const stateMap: Record<string, [string, string]> = {
  'qa': ['卡塔尔', 'Qatar'],
  'ec': ['厄瓜多尔', 'Ecuador'],
  'sn': ['塞内加尔', 'Senegal'],
  'nl': ['荷兰', 'Netherlands'],
  'gb-eng': ['英格兰', 'England '],
  'ir': ['伊朗', 'Iran'],
  'us': ['美国', 'USA'],
  'gb-wls': ['威尔士', 'Wales'],
  'ar': ['阿根廷', 'argentina'],
  'sa': ['沙特', 'Saudi Arabia'],
  'mx': ['墨西哥', 'Mexico'],
  'pl': ['波兰', 'Poland'],
  'fr': ['法国', 'France'],
  'au': ['澳大利亚', 'Australia'],
  'dk': ['丹麦', 'Denmark'],
  'tn': ['突尼斯', 'Tunisia'],
  'es': ['西班牙', 'Spain'],
  'cr': ['哥斯达黎加', 'Costa Rica'],
  'de': ['德国', 'Germary'],
  'jp': ['日本', 'Japan'],
  'be': ['比利时', 'Belgium'],
  'ca': ['加拿大', 'Canada'],
  'ma': ['摩洛哥', 'Morocco'],
  'hr': ['克罗地亚', 'Croatia'],
  'br': ['巴西', 'Brazil'],
  'rs': ['塞尔维亚', 'Serbia'],
  'ch': ['瑞士', 'Switzerland'],
  'cm': ['喀麦隆', 'Cameroon'],
  'pt': ['葡萄牙', 'Portugal'],
  'gh': ['加纳', 'Ghana'],
  'uy': ['乌拉圭', 'Uruguay'],
  'kr': ['韩国', 'South Korea'],
  '': ['待定', 'TBD']
}

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
        <div class="state-name">{{ stateName[0] }}</div>
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
  @apply font-semibold;
}

.state-en {
  @apply text-sm text-slate-500 dark:text-slate-600 whitespace-nowrap;
}

.state-card-slot {
}
</style>
