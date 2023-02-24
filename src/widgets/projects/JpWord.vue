<script lang="ts" setup>
import wordsJSON from '@/meta/n5.json'
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { shuffle } from '@/shared'
import { useMagicKeys } from '@vueuse/core'

enum ModeType {
  simple, hard
}

const levelOptions = [
  { name: 'N5', value: '5' },
  { name: 'N1', value: '1' },
]

const level = ref(levelOptions[0].value)
const pickLength = 4
const words = ref<{ t: string, k: string}[]>(wordsJSON) // .slice(0, 8)
const wordLen = computed(() => words.value.length)

const restIndex = ref<number[]>([])
const passedCount = ref(0)
const timeCount = ref(0)
let timeCountTimer: ReturnType<typeof setInterval> = 0 as any


const modeTypeOption = [
  { name: '簡単', value: ModeType.simple },
  { name: '修羅', value: ModeType.hard },
]

const currentMode = ref(ModeType.simple)
const currentWords = ref<any[]>([])
const simple = reactive({
  randomOrders: [] as number[],
  leftIndex: -1,
  rightIndex: -1,
  goodIndex: [] as number[]
})
const simplePress = useMagicKeys()

const hard = reactive({
  randomOrders: [] as number[][],
  focusIndex: -1,
  focusOrder: [] as number[],
  goodIndex: [] as number[],
})


function reset() {
  restIndex.value = shuffle(Array.from({ length: wordLen.value }).map((_, i) => i))
  passedCount.value = 0
  currentWords.value = []

  if (currentMode.value === ModeType.simple) {
    simple.randomOrders = []
    simple.leftIndex = simple.rightIndex = -1
    simple.goodIndex = []
  }
}

function pick(count: number) {
  const newWords = restIndex.value.splice(0, count)
  currentWords.value = newWords

  if (currentMode.value === ModeType.simple) {
    simple.randomOrders = shuffle(Array.from({ length: count }).map((_, i) => i))
    simple.leftIndex = -1
    simple.rightIndex = -1
    simple.goodIndex = []
  }
  else if (currentMode.value === ModeType.hard) {
    hard.focusIndex = -1
    hard.focusOrder = []
    hard.goodIndex = []
    hard.randomOrders = newWords.map((wordIndex, i) => {
      const wordLength = words.value[wordIndex].k.split('').length
      return shuffle(Array.from({ length: wordLength }).map((_, i) => i))
    })
  }
}

function simpleClick(key: 'leftIndex' | 'rightIndex', index: number) {
  if (simple.goodIndex.includes(index)) return

  const another = key === 'leftIndex' ? 'rightIndex' : 'leftIndex'
  if (
    simple[another] !== -1 && simple[another] !== index
  ) {
    simple[another] = -1
    // emit error tip
    return
  }

  simple[key] = index
}


function hardFocusClick(index: number) {
  if (hard.goodIndex.includes(index)) return
  hard.focusIndex = index
  hard.focusOrder = []
}

function hardOrderClick(rowIndex: number, index: number) {
  if (hard.goodIndex.includes(rowIndex)) return
  if (hard.focusIndex !== rowIndex) {
    hard.focusIndex = rowIndex
    hard.focusOrder = []
  }

  const currOrderIndex = hard.focusOrder.indexOf(index)
  if (currOrderIndex < 0) {
    hard.focusOrder.push(index)
  }
  else {
    hard.focusOrder.splice(currOrderIndex, 1)
  }
}

function hardSkipClick(i: number) {
  if (hard.goodIndex.indexOf(i) < 0) hard.goodIndex.push(i)
}

function changeMode(mode: ModeType) {
  currentMode.value = mode
  restart()
}

function restart() {
  timeCount.value = 0
  reset()
  pick(pickLength)
}

watch(simple, function checkSimpleAnswer() {
  if (simple.leftIndex !== -1 && simple.leftIndex === simple.rightIndex) {
    simple.goodIndex.push(simple.leftIndex)
    simple.leftIndex = -1
    simple.rightIndex = -1
    passedCount.value++

    if (simple.goodIndex.length === pickLength) {
      console.log(1)
      setTimeout(() => pick(pickLength), 500)
    }
  }

})

const simplePressWatchList = Array.from({ length: pickLength }).map((_, i) => {
  const key = `digit${i + 1}`
  return simplePress[key]
})

watch(simplePressWatchList, function listenSimplePress(watchResult) {
  const i = watchResult.indexOf(true)
  if (i === -1) return
  if (simple.leftIndex === -1) {
    // if (simple.goodIndex.includes(simple.randomOrders.indexOf(i))) return pressed
    simpleClick('leftIndex', i)
  }
  else {
    simpleClick('rightIndex', simple.randomOrders.indexOf(i))
  }
})

watch(hard, function checkHardAnswer() {
  if (
    hard.focusIndex >= 0
  ) {
    const word = words.value[currentWords.value[hard.focusIndex]].k
    if (
      word.split('').length === hard.focusOrder.length
      && hard.focusOrder.map((o) => word[o]).join('') === word
    ) {
      hard.goodIndex.push(hard.focusIndex)
      hard.focusIndex = -1
      hard.focusOrder = []
      passedCount.value++

      if (hard.goodIndex.length === pickLength) {
        setTimeout(() => pick(pickLength), 500)
      }
    }
  }


})

watch(passedCount, (passed) => {
  if (passed === 0) {
    clearInterval(timeCountTimer)

  }
  else if (timeCountTimer === 0 as any) {
    const space = 1
    timeCountTimer = setInterval(() => {
      timeCount.value += space
    }, space * 1000)
  }
})



onMounted(restart)

</script>

<template>
  <div class="jp-word">
    <!-- -->
    <div class="jp-word-mode jp-word-content mb-4">
      <!-- <SimpleSelect v-model="level">
        <option v-for="opt in levelOptions" :key="opt.value">{{ opt.name }}</option>
      </SimpleSelect> -->
      <SimpleButton
        @click="changeMode(opt.value)"
        :class="{ active: opt.value === currentMode }"
        v-for="opt in modeTypeOption"
        :key="opt.value"
      >
        {{ opt.name }}
      </SimpleButton>
      <div class="self-center flex-1 text-right">
        {{ passedCount }} / {{ wordLen }}
      </div>
    </div>
    <div v-if="passedCount === wordLen">
      終わりました，<span class="jp-link-btn" @click="restart">つづく</span>
    </div>
    
    <div 
      v-else-if="currentMode === ModeType.simple"
      class="jp-word-content"
    >
      <div class="jp-word-col">
        <SimpleButton 
          v-for="(wordIndex, i) in currentWords"
          :key="i" :class="{
            active: simple.leftIndex === i,
            passed: simple.goodIndex.includes(i),
          }"
          @click="simpleClick('leftIndex', i)"
        >
          {{ words[wordIndex].t }}
        </SimpleButton>
      </div>
      <div class="jp-word-col">
        <SimpleButton
          v-for="(wordIndex, i) in currentWords"
          :key="i"
          :style="{ order: simple.randomOrders[i] }"
          :class="{
            active: simple.rightIndex === i,
            passed: simple.goodIndex.includes(i),
          }"
          @click="simpleClick('rightIndex', i)"
        >
          {{ words[wordIndex].k }}
        </SimpleButton>
      </div>
    </div>
    <div v-else-if="currentMode === ModeType.hard">
      <div v-for="(wordIndex, i) in currentWords" :key="i" class="block md:flex gap-4">
        <div class="flex-1 mb-4">
          <SimpleButton
            :class="{
              active: hard.focusIndex === i,
              passed: hard.goodIndex.includes(i),
            }" 
            @click="hardFocusClick(i)"
          >
            <div>{{ words[wordIndex].t }}</div>
          </SimpleButton>
        </div>

        <div class="flex-1 mb-4">
          <SimpleButton
            class="passed"
            v-if="hard.goodIndex.includes(i)"
          >{{ words[wordIndex].k }}</SimpleButton>
          
          <div class="flex gap-2" v-else>
            <div class="flex flex-1 gap-1">
              <SimpleButton
                v-for="(text, j) in words[wordIndex].k.split('')"
                :style="{ order: hard.randomOrders[i][j] }" 
                :class="{
                  active: hard.focusIndex === i && hard.focusOrder.includes(j),
                  passed: hard.goodIndex.includes(i),
                }" 
                @click="hardOrderClick(i, j)"
                :key="j">
                {{ text }}
                <span 
                  class="jp-word-tip"
                  v-if="hard.focusIndex === i && hard.focusOrder.includes(j)">
                  {{ hard.focusOrder.indexOf(j) + 1 }}
                </span>
              </SimpleButton>
            </div>
            <SimpleButton @click="hardSkipClick(i)">
              skip
            </SimpleButton>
          </div>
        </div>
      </div>

    </div>

    <!-- <div class="jp-word-btn text-center" @click="pick(pickLength)">GO</div> -->

    <div>
      已用时：{{ timeCount }}s
    </div>
  </div>
</template>

<style lang="postcss">
.jp-word {
  @apply;
}

.jp-word-content {
  @apply flex gap-4;

  &.wrap {
    @apply block md:flex mb-4;
  }
}

.jp-word-col {
  @apply flex-1 flex flex-col gap-2;
}

.jp-word .simple-button {
  @apply relative;

  &.passed {
    @apply border-violet-500 bg-violet-100 dark:bg-gray-800;
  }

  &.skip {
    @apply absolute right-0
  }
}

.jp-word-tip {
  @apply absolute w-4 h-4 -top-2 border-1 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center;
}

.jp-link-btn {
  @apply underline hover: text-violet cursor-pointer;
}
</style>
