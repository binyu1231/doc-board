<script lang="ts" setup>
import { computed } from 'vue'


const props = defineProps<{
  firstDateString: string,
  raceConfig: string[]
}>()

const firstDate = computed(() => new Date(props.firstDateString)) 

function getDate(rowOffset: number) {
  return new Date(firstDate.value.getTime() + rowOffset * 24 * 3600000)
}

function isToday(rowOffset: number) {
  const date = getDate(rowOffset);
  let today = new Date();
  today = today < firstDate.value ? firstDate.value : today

  return date.getDate() === today.getDate() 
    && date.getMonth() === today.getMonth() 
    && date.getFullYear() === today.getFullYear()
}

const races = computed(() => props.raceConfig.map((day) => {
  const [d, name] = day.split('@')
  return {
    name,
    children: d.length === 0 ? [] : d.split(',').map(race => race.length === 0 ? [] : race.split(':'))
  }
}))
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
