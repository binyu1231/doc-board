<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
const dbl = (n: number) => n < 10 ? `0${n}` : `n`
const props = withDefaults(
    defineProps<{
        states: [string, string],
        scores?: [string, string],
        time: string
    }>(),
    {
        scores: () => ['0', '0']
    }
);

const beginTime = ref(new Date(props.time))
const isOver = ref((new Date()).getTime() > beginTime.value.getTime());
const primaryWin = computed(() => Number(props.scores[0]) > Number(props.scores[1]))
const count = ref(isOver.value ? 0 : Math.floor((new Date()).getTime() - beginTime.value.getTime()));
const countD = ref('00');
const countH = ref('00');
const countM = ref('00');
const countS = ref('00'); // computed(() => count.value % 60)
let timer: ReturnType<typeof setInterval> = 0

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
        <span v-if="isOver">已结束</span>
        <span>距开始: {{ countD }} 天 {{ countH }} 时 {{ countM }} 分 {{ countS }} 秒</span>
    </div>
    <div>
        <StateCard :state="states[0]" :win="isOver && primaryWin" />
        <div class="battle-score">{{ scores[0] }}</div>
        <div>VS</div>
        <div class="battle-score">{{ scores[1] }}</div>
        <StateCard :state="states[1]" :win="isOver && !primaryWin"/>
    </div>
  </div>
</template>

<style lang="postcss">
.battle-card {
  @apply;
}
</style>
