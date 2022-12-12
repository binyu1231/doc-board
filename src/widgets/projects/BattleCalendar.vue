<script lang="ts" setup>
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
  'qa0:ec2,,,gb-eng6:ir2@第1轮',
  'sn0:nl2,us1:gb-wls1,ar1:sa2,dk0:tn0',
  'mx0:pl0,fr4:au1,ma0:hr0,de1:jp2',
  'es7:cr0,be1:ca0,ch1:cm0,uy0:kr0',
  'pt3:gh2,br2:rs0,gb-wls0:ir2,qa1:sn3@第2轮', // 第二轮
  'nl1:ec1,gb-eng0:us0,tn0:au1,pl2:sa0',
  'fr2:dk1,ar2:mx0,jp0:cr1,be0:ma2',
  // ---
  'hr4:ca1,es1:de1,cm3:rs3,kr2:gh3',
  'br1:ch0,pt2:uy0,nl2:qa0,ec1:sn2@第3轮', // 第三轮
  'gb-wls0:gb-eng3,ir0:us1,tn0:fr1,au1:dk0',
  'pl0:ar2,sa1:mx2,hr0:be0,ca1:ma2',
  'jp2:es1,cr2:de4,kr2:pt1,gh0:uy2',
  'cm1:br0,rs2:ch3,,nl3:us1@1/8决赛', // 1/8
  ',ar2:au1,,fr3:pl1',
  // ---
  ',gb-eng3:sn0,,jp1:hr1',
  ',br4:kr1,,ma0:es0',
  ',pt6:ch1,,',
  '',
  ',,,hr1:br1@1/4决赛', // 1/4
  ',nl2:ar2,,ma1:pt0',
  ',gb-eng1:fr2,,',
  // ---
  '',
  '',
  ',ar:hr,,@半决赛', // 1/2
  ',fr:ma,,',
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
      class="battle-calendar-cell">
      <div
        v-for="(day, i) in races"
        :key="i"
        class="battle-calendar-day"
        :class="{ active: isToday(i) }"
        >
        <div class="bcd-content">
          <div class="battle-calendar-halfday">
            <BattleCalendarRace :race="day.children[0]" />
            <BattleCalendarRace :race="day.children[1]" />
          </div>
          <div class="battle-calendar-hr" />
          <div class="battle-calendar-halfday">
            <BattleCalendarRace :race="day.children[2]" />
            <BattleCalendarRace :race="day.children[3]" />
          </div>
        </div>
        <div class="battle-calendar-footer">
          <div class="transform -translate-y-[1px]">{{ day.name }}</div>
          <div :class="{ 'has-name': day.name }">
            <span v-if="i === 0">Nov.</span>
            <span v-if="i === 10">Dec.</span>
            <span class="date">{{ getDate(i).getDate() }}</span>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style lang="postcss">
.battle-calendar {
}

.battle-calendar-hr {
  @apply border-b border-slate-400 dark:border-slate-700 m-1;
}

.battle-calendar-day {
  @apply 
    flex flex-col
    h-68 md:h-38 border-b border-r border-slate-400 dark:border-slate-700;

  &.active {
    @apply 
      bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 text-slate-100;
  }
}

.battle-calendar-cell {
  @apply
    border-l border-t 
    border-slate-400 dark:border-slate-700 
    grid-cols-7 grid
    ;
}

.bcd-content {
  @apply flex-1 flex flex-col md:block;
}

.battle-calendar-halfday {
  @apply flex items-stretch md:flex-col flex-1 p-0.5 md:p-1 gap-0.5 md:gap-1;
}

.battle-calendar-footer {
  @apply text-right h-6 px-2 pb-1 flex justify-between items-end text-xs whitespace-nowrap;

  & > div {
    @apply flex items-end;
  }

  & .date {
    @apply font-semibold text-sm ml-1;
  }

  & .has-name {
    @apply hidden md:block;
  }
}


</style>
