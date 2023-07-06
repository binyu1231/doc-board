<script lang="ts" setup>
import { ref } from 'vue'
import { toDbl } from '@/shared'

const dayMilliseconds = 24 * 3600000
const yangSignDate = new Date('2023-02-21 00:00:00')
const yangSignWorkMap: any = { 0: '🌙', 1: '🌙', 2: '⛱️', 3: '⛱️', 4: '☀️', 5: '☀️', 6: '🌗', 7: '🌗', }

const d = new Date()
const m = d.getMonth() + 1
const y = d.getFullYear()
const today = d.getDate()

const dateString = `${today}`
const monthStartDate = new Date(`${y}-${toDbl(m)}-01 00:00:00`)
const monthEndDate = new Date(`${m === 12 ? y + 1 : y}-${toDbl(m === 12 ? 1: m + 1)}-01 00:00:00`)


const monthStartWeekday = monthStartDate.getDay()
const monthDays = (monthEndDate.getTime() - monthStartDate.getTime()) / dayMilliseconds


const currentMonth = ref(m)

function calcDateDisplay(row: number, col: number): string {
    const date = (row - 1) * 7 + col - monthStartWeekday
    if (date < 1 || date > monthDays) return ''
    return `${date}`
}


const divOffset = 1 / 3 + (d.getTime() - new Date(`${y}-${toDbl(m)}-${toDbl(today)} 00:00:00`).getTime()) / dayMilliseconds / 3
const todayDateCellIndex = [
  today % 7 + monthStartWeekday - 1,
  Math.floor((today + monthStartWeekday - 1) / 7)
]


function calcWorkSign(date: string) {
  if (!date) return ''

  const currentDateStart = new Date(`${y}-${toDbl(m)}-${toDbl(date)} 00:00:00`)
  const dayDistance = (currentDateStart.getTime() - yangSignDate.getTime()) / dayMilliseconds
  return (dayDistance % 8 + 8) % 8
}

function calcWork(date: string) {
    if (!date) return ''
    return yangSignWorkMap[calcWorkSign(date)]
}

</script>

<template>
  <div class="zoo-sheep-monitor">
    <!-- -->
    <div class="relative">
      <table>
        <thead>
          <tr>
            <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="i in 6" :key="i" class="cal-row">
                <template v-for="j in 7" :key="j">
                  <Scope
                    :variables="{ date: calcDateDisplay(i, j) }"
                    v-slot="{ date }"
                  >
                    <td
                      :key="j"
                      class="cal-cell"
                      :class="[
                        { 
                          active: currentMonth === m && date === dateString,
                          'display-content': Math.abs(Number(date) - Number(dateString)) <= 1,
                        },
                        'sign-' + calcWorkSign(date)
                      ]"
                      >
                        <span class="date-count">
                          {{ date }}
                        </span>
    
                        <div class="bottom-block">
                          <img class="w-4 transfrom rotate-y-180 mr-1" v-if="currentMonth === m && date === dateString" src="/e255.gif" alt="">
                          <span>{{ calcWork(date) }}</span>
                        </div>
                      </td>
                    </Scope>
                </template>
            </tr>
        </tbody>
      </table>
      <div 
        class="work-range-container" 
        :style="{ 
          width: 3 / 7 * 100 + '%',
          left: (todayDateCellIndex[0] - 1) / 7 * 100 + '%', 
          top: todayDateCellIndex[1] * 5 + 2.5 + 'rem'
        }"
      >
        <div class="work-range-line" :style="{ left: divOffset * 100 + '%'}"></div>
      </div>
    </div>


  </div>
</template>

<style lang="postcss">
.zoo-sheep-monitor {
  @apply pt-4;

  & table tbody tr td {
    &:last-of-type,
    &:first-of-type {
      @apply pr-2 border-l;
    }
  }

  & th {
    @apply text-center h-10 box-border;
  }
  & .cal-cell {
    @apply h-20 border-r p-2 border-box relative;

    &.active {
      @apply;
      & .date-count {
        @apply text-lg font-700 text-violet-600 dark:text-violet-200;
      }
    }

    &.display-content {
      &::before, &::after {
        @apply absolute h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 dark:opacity-60 top-0;
        content: '';
      }

      &.sign-4, &.sign-5 {
        &::before {
          left: 29%; width: 33%
        }
      }

      &.sign-6, &.sign-7 {
        &::before {
          left: 62.5%; width: 33%
        }
      }

      &.sign-0, &.sign-1 {
        &::before {
          left: 95.8%; width: 4.2%
        }
      }

      &.sign-1, &.sign-2 {
        &::after {
          left: 0; width: 29%;
        }
      }
    }


    & .bottom-block {
      @apply absolute z-20 bottom-2 right-2 flex items-center;
    }

  }

  & .work-range-container {
    @apply absolute min-h-20 opacity-20;
  }

  & .work-range-line {
    @apply absolute -top-1 -bottom-1 border-l border-red-700 dark:border-red-100 z-10;
  }




}
</style>
