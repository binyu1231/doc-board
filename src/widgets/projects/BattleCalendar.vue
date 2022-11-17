<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { stateMap } from './type';
const firstDate = new Date('2022-11-21 00:00:00')

function getDate(rowOffset: number) {
  return new Date(firstDate.getTime() + (rowOffset - 1) * 24 * 3600000).getDate()
}

const races = [
  'qa:ec,,,gb-eng:ir',
  'sn:nl,us:gb-wls,ar:sa,dk:tn',
  'mx:pl,fr:au,ma:hr,de:jp',
  'es:cr,be:ca,ch:cm,uy:kr',
  'pt:gh,br:rs,bg-wls:ir,qa:sn',
  'nl:ec,gb-eng:us,tn:au,pl:sa',
  'fr:dk,ar:mx,jp:au,pl:cr',
  // ---
  'hr:ca,es:de,jp:au,cm:rs',
  'br:ch,pt:uy,nl:qa,ec:sn',
  'gb-wls:gb-eng,ir:us,tn:fr,au:dk',
  'pl:ar,sa:mx,hr:be,ca:ma',
  'jp:es,cr:de,kr:pt,gh:uy',
  'cm:br,rs:ch,,',
  '',
  // ---
  'qa:ar,qa:mx,,',
  'jp:kr,de:dk,nl,br',
  '',
  '',
  '',
  '',
  '',
  // ---
  'qa:ar,qa:mx,,',
  'jp:kr,de:dk,nl,br',
  '',
  '',
  '',
  '',
  '',
  // ---
  'qa:ar,qa:mx,,',
  'jp:kr,de:dk,nl,br',
  '',
  '',
  '',
  '',
  '',
  // ---
]
</script>

<template>
  <div class="battle-calendar">
    <!-- -->
    <div class="flex">
      <div 
        class="flex-1 text-center h-10 text-lg font-semibold" 
        v-for="r in ['一', '二', '三', '四', '五', '六', '日']" 
        :key="r">
        {{ r }}
      </div>
    </div>
    <div 
      
      class="border-l border-t border-slate-400 dark:border-slate-700 grid-cols-7 grid">
      <div
        v-for="(r, i) in races"
        :key="i"
        class="relative h-38 border-b border-r border-slate-400 dark:border-slate-700"
        >
        <template v-if="r">
          <div
            :key="j"
            v-for="(race, j) in r.split(',')"
          >
            <div
              v-if="race"
              class="text-xs whitespace-nowrap relative bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-shadow-sm overflow-hidden py-1 m-1 rounded">
              <Icon :icon="`circle-flags:${race.split(':')[0]}`" class="icon" /> 
              <Icon :icon="`circle-flags:${race.split(':')[1]}`" class="icon" /> 
              <div class="relative px-1 w-full z-10 flex justify-between items-center">
                <span class="">{{ stateMap[race.split(':')[0]][0] }}</span>
                <span class="">{{ stateMap[race.split(':')[1]][0] }}</span>
              </div>
            </div>
            <div v-else>
              <span>{{ '\u00A0' }}</span>
            </div>
          </div>
        </template>
        <div class="absolute left-0 bottom-0 right-0  text-right px-2 pb-1 flex justify-between items-center">
          <span class="text-xs">第三轮</span>
          <span>{{ getDate(i)}}</span>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style lang="postcss">
.battle-calendar {
  @apply;
}
</style>
