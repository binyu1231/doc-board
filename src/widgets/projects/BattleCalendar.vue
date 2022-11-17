<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { stateMap } from './type';
const firstDate = new Date('2022-11-21 00:00:00')

function getDate(rowOffset: number) {
  return new Date(firstDate.getTime() + rowOffset * 24 * 3600000)
}

function isToday(rowOffset: number) {
  const date = getDate(rowOffset);
  let today = new Date();
  today = today < firstDate ? firstDate : today

  return date.getDate() === today.getDate() 
    && date.getMonth() === today.getMonth() 
    && date.getFullYear() === today.getFullYear()
}

const races = [
  'qa:ec,,,gb-eng:ir@第一轮',
  'sn:nl,us:gb-wls,ar:sa,dk:tn',
  'mx:pl,fr:au,ma:hr,de:jp',
  'es:cr,be:ca,ch:cm,uy:kr',
  'pt:gh,br:rs,gb-wls:ir,qa:sn@第二轮', // 第二轮
  'nl:ec,gb-eng:us,tn:au,pl:sa',
  'fr:dk,ar:mx,jp:au,pl:cr',
  // ---
  'hr:ca,es:de,jp:au,cm:rs',
  'br:ch,pt:uy,nl:qa,ec:sn@第三轮', // 第三轮
  'gb-wls:gb-eng,ir:us,tn:fr,au:dk',
  'pl:ar,sa:mx,hr:be,ca:ma',
  'jp:es,cr:de,kr:pt,gh:uy',
  'cm:br,rs:ch,,:@1/8决赛', // 1/8
  ',:,,:',
  // ---
  ',:,,:',
  ',:,,:',
  ',:,,',
  '',
  ',,,:@1/4决赛', // 1/4
  ',:,,:',
  ',:,,',
  // ---
  '',
  '',
  ',:,,@半决赛', // 1/2
  ',:,,',
  '',
  ',,,:@季军赛', // 季军赛
  ',,,:@决赛', // 决赛
  // ---
].map((day) => {
  const [d, name] = day.split('@')
  return {
    name,
    children: d.length === 0 ? [] : d.split(',').map(race => race.length === 0 ? [] : race.split(':'))
  }
})
</script>

<template>
  <div class="battle-calendar">
    <!-- -->
    <div class="flex pt-4">
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
        v-for="(day, i) in races"
        :key="i"
        class="battle-calendar-day"
        :class="{ active: isToday(i) }"
        >
          <div
            :key="j"
            v-for="(race, j) in day.children"
          >
            <div v-if="j === 2" class="border-b border-slate-400 dark:border-slate-700 m-1" />
            <div
              v-if="race.length > 0"
              class="text-xs h-6 border-box whitespace-nowrap relative bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-shadow-sm overflow-hidden py-1 m-1 rounded">

              <Icon :icon="`circle-flags:${race[0]}`" class="absolute text-4xl -left-4 -top-3 opacity-25" /> 
              <Icon :icon="`circle-flags:${race[1]}`" class="absolute text-4xl -right-4 -top-3 opacity-25" /> 
              <div class="relative px-1 w-full z-10 flex justify-between items-center">
                <span class="">{{ stateMap[race[0]]?.[0] ?? 'TBD' }}</span>
                <span class="">{{ stateMap[race[1]]?.[0] ?? 'TBD' }}</span>
              </div>
            </div>
            <div v-else class="h-6 m-1">
              <span>{{ '\u00A0' }}</span>
            </div>
          </div>
        <div class="absolute left-0 bottom-0 right-0  text-right px-2 pb-1 flex justify-between items-center">
          <span class="text-xs">{{ day.name }}</span>
          <span class="font-semibold absolute right-1 bottom-0.5">
            <span class="text-xs" v-if="i === 0">Nov.</span>
            <span class="text-xs" v-if="i === 10">Dec.</span>
            {{ getDate(i).getDate() }}
          </span>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style lang="postcss">
.battle-calendar {
  @apply;
}

.battle-calendar-day {
  @apply relative h-38 border-b border-r border-slate-400 dark:border-slate-700;

  &.active {
    @apply bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 text-slate-100;
  }
}
</style>
