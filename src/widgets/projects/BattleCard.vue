<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
const dayMap = ['日', '一', '二', '三', '四', '五', '六', '日']
const dbl = (n: number) => n < 10 ? `0${n}` : `${n}`
const formatGoal = (str: string) => {
  return str.split(',').filter(i => i).map((goal) => {
    const [time, name] = goal.split('@')
    return { name, time: time.replace(/:/g, '\'') + '"' }
  })
}
const props = withDefaults(
  defineProps<{
    states: [string, string],
    scores?: [string, string],
    time: string
    g: string,
    goals?: string[]
  }>(),
  {
    scores: () => ['0', '0'],
    goals: () => ([])
  }
);

const now = new Date()
const beginTime = ref(new Date(props.time))
const beginTimeString = computed(() => {
  const begin = beginTime.value
  return `${begin.getMonth() + 1}月${dbl(begin.getDate())}日 ${dbl(begin.getHours())}:${dbl(begin.getMinutes())}(${dayMap[begin.getDay()]})`
})
const isOver = ref(now > beginTime.value);
const primaryWin = computed(() => Number(props.scores[0]) > Number(props.scores[1]))
const leftGoals = computed(() => formatGoal(props.goals?.[0] ?? ''))
const rightGoals = computed(() => formatGoal(props.goals?.[1] ?? ''))
const count = ref(isOver.value ? 0 : Math.floor((beginTime.value.getTime() - now.getTime()) / 1000));
const countD = ref('00');
const countH = ref('00');
const countM = ref('00');
const countS = ref('00'); // computed(() => count.value % 60)
let timer: ReturnType<typeof setInterval>

function calc() {
  countS.value = dbl(count.value % 60)
  const restMinutes = Math.floor(count.value / 60)
  countM.value = dbl(restMinutes % 60)
  const restHours = Math.floor(restMinutes / 60)
  countH.value = dbl(restHours & 24)
  countD.value = dbl(Math.floor(restHours / 24))
}

onMounted(() => {
  calc()
  timer = setInterval(() => {
    count.value -= 1
    calc()

    if (count.value <= 0) {
      clearInterval(timer)
      isOver.value = true
    }
  }, 1000);
})

onBeforeUnmount(() => {
  clearInterval(timer);
})
</script>

<template>
  <div class="battle-card">
    <!-- -->
    <div class="battle-card-date">
      <div class="battle-date">{{ beginTimeString }}</div>
      <span class="battle-date-desc" v-if="isOver">已结束 ({{g}})</span>
      <span class="battle-date-desc" v-else>距开始: {{ countD }} 天 {{ countH }} 时 {{ countM }} 分 {{ countS }} 秒 ({{g}})</span>
    </div>
    <div class="battle-card-content">
      <StateCard :state="states[0]" :win="isOver && primaryWin">
        <div class="battle-card-goal" v-for="(g, i) in leftGoals" :key="i">
          <span class="battle-card-goal-name">{{ g.name }}</span>
          <span>{{ g.time }}</span>
        </div>
      </StateCard>
      <div class="battle-deco">
        <div class="battle-score">{{ scores[0] }}</div>
        <div class="battle-word">VS</div>
        <div class="battle-score">{{ scores[1] }}</div>
      </div>
      <StateCard :state="states[1]" :win="isOver && !primaryWin">
        <div class="battle-card-goal" v-for="(g, i) in rightGoals" :key="i">
          <span class="battle-card-goal-name">{{ g.name }}</span>
          <span>{{ g.time }}</span>
        </div>
      </StateCard>
    </div>
  </div>
</template>

<style lang="postcss">
.battle-card {
  @apply mb-2;
}

.battle-card-date {
  @apply flex justify-between mb-2 items-end;
}

.battle-word {
  @apply text-xl mx-4 text-slate-400 dark:text-slate-700;
}

.battle-date {
  @apply text-lg font-semibold;
}

.battle-score {
  @apply text-4xl mx-4;
}

.battle-date-desc {
  @apply text-sm text-slate-500;
}

.battle-deco {
  @apply flex items-center h-15;
}

.battle-card-content {
  @apply flex justify-between items-start;
}

.battle-card-goal {
  @apply px-4 pb-1 text-xs flex justify-between;
  &:last-of-type {
    @apply mb-2;
  }
}

.battle-card-goal-name {
  @apply ;
}
</style>
