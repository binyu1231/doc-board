<script lang="ts" setup>
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { shuffle, loadPublicJson } from '@/shared'
import { useMagicKeys, useStorage } from '@vueuse/core'

enum ModeType {
  simple, hard
}

const storageKey = 'jp-word'



const levelOptions = [
  { name: 'N5', value: '5' },
  { name: 'N1', value: '1' },
]




const state = useStorage(storageKey, {
  level: levelOptions[0].value,
  restIndex: [] as number[],
  timeCount: 0,
  passedCount: 0,
  currentMode: ModeType.simple,
  currentWords: [] as number[]
}, localStorage)


const pickLength = 4
const words = ref<{ t: string, k: string}[]>([]) 
const wordLen = computed(() => words.value.length)

let timeCountTimer: ReturnType<typeof setInterval> = 0 as any


const modeTypeOption = [
  { name: '\u7c21\u5358', value: ModeType.simple },
  { name: '\u4fee\u7f85', value: ModeType.hard },
]

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


function init() {
  if (state.value.currentMode === ModeType.simple) {
    simple.randomOrders = []
    simple.leftIndex = simple.rightIndex = -1
    simple.goodIndex = []
  }
  else if (state.value.currentMode === ModeType.hard) {
    hard.randomOrders = []
    hard.focusIndex = -1
    hard.focusOrder = []
    hard.goodIndex = []
  }
}


function reset() {
  state.value.timeCount = 0
  state.value.restIndex = shuffle(Array.from({ length: wordLen.value }).map((_, i) => i))
  state.value.passedCount = 0
}

function genOrders() {
  if (state.value.currentMode === ModeType.simple) {
    simple.randomOrders = shuffle(Array.from({ length: state.value.currentWords.length }).map((_, i) => i))
  }
  else if (state.value.currentMode === ModeType.hard) {
    hard.randomOrders = state.value.currentWords.map((wordIndex) => {
      const wordLength = words.value[wordIndex].k.split('').length
      return shuffle(Array.from({ length: wordLength }).map((_, i) => i))
    })
  }
}

function pick(count: number) {
  const newWords = state.value.restIndex.splice(0, count)
  state.value.currentWords = newWords

  if (state.value.currentMode === ModeType.simple) {
    simple.leftIndex = -1
    simple.rightIndex = -1
    simple.goodIndex = []
  }
  else if (state.value.currentMode === ModeType.hard) {
    hard.focusIndex = -1
    hard.focusOrder = []
    hard.goodIndex = []
  }

  genOrders()
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
  if (hard.goodIndex.indexOf(i) < 0) {

    
    const word = words.value[state.value.currentWords[i]].k

    hard.focusOrder = Array.from({ length: word.length}).map((_, i) => i)
    hard.focusIndex = i
  }
}

function changeMode(mode: ModeType) {
  const yes = confirm('修改模式会清空进度')
  if (!yes) return
  state.value.currentMode = mode
  restart()
}

function handleLevelChange(level: string) {
  console.log(state.value.level, level)
  const yes = confirm('修改等级会丢失进度')
  if (!yes) return

  state.value.level = level
  loadWords(level)
  .then(restart)

}

function restart() {
  
  init()
  reset()
  pick(pickLength)
}

watch(simple, function checkSimpleAnswer() {
  if (simple.leftIndex !== -1 && simple.leftIndex === simple.rightIndex) {
    simple.goodIndex.push(simple.leftIndex)
    simple.leftIndex = -1
    simple.rightIndex = -1
    state.value.passedCount++

    if (simple.goodIndex.length === pickLength) {
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
    const word = words.value[state.value.currentWords[hard.focusIndex]].k
    if (
      word.split('').length === hard.focusOrder.length
      && hard.focusOrder.map((o) => word[o]).join('') === word
    ) {
      hard.goodIndex.push(hard.focusIndex)
      hard.focusIndex = -1
      hard.focusOrder = []
      state.value.passedCount++

      if (hard.goodIndex.length === pickLength) {
        setTimeout(() => pick(pickLength), 500)
      }
    }
  }


})

watch(() => state.value.passedCount, (passed) => {
  if (passed === 0 || passed === wordLen.value) {
    clearInterval(timeCountTimer)

  }
  else if (timeCountTimer === 0 as any) {
    const space = 1
    timeCountTimer = setInterval(() => {
      state.value.timeCount += space
    }, space * 1000)
  }
})

function loadWords(level: string) {
  return loadPublicJson(`/meta-n${level}.json`)
  .then((wordsJSON: any[]) => {
    words.value = wordsJSON
  })
  
 
}

onMounted(() => {
  loadWords(state.value.level)
  // restart()
  .then(() => {
    init()
    if (state.value.restIndex.length === 0) {
      reset()
    }
    if (state.value.currentWords.length === 0) {
      pick(pickLength)
    }
    else {
      genOrders()
    }
  })
  
})

</script>

<template>
  <div class="jp-word">
    <!-- -->
    <div class="jp-word-mode jp-word-content mb-4">
      <SimpleSelect :modelValue="state.level" @change="handleLevelChange">
        <option
          v-for="opt in levelOptions"
          :key="opt.value"
          :value="opt.value">{{ opt.name }}</option>
      </SimpleSelect>
      <SimpleButton
        @click="changeMode(opt.value)"
        :class="{ active: opt.value === state.currentMode }"
        v-for="opt in modeTypeOption"
        :key="opt.value"
      >
        {{ opt.name }}
      </SimpleButton>
      <div class="self-center flex-1 text-right">
        {{ state.passedCount }} / {{ wordLen }}
      </div>
    </div>
    <div v-if="state.passedCount === wordLen">
      {{ '\u7d42\u308f\u308a\u307e\u3057\u305f' }}。 <span class="jp-link-btn" @click="restart">{{ '\u3064\u3065\u304f' }}</span>
    </div>
    
    <div 
      v-else-if="state.currentMode === ModeType.simple"
      class="jp-word-content"
    >
      <div class="jp-word-col">
        <SimpleButton 
          v-for="(wordIndex, i) in state.currentWords"
          :key="i" :class="{
            active: simple.leftIndex === i,
            passed: simple.goodIndex.includes(i),
          }"
          @click="simpleClick('leftIndex', i)"
        >
          {{ words[wordIndex]?.t }}
        </SimpleButton>
      </div>
      <div class="jp-word-col">
        <SimpleButton
          v-for="(wordIndex, i) in state.currentWords"
          :key="i"
          :style="{ order: simple.randomOrders[i] }"
          :class="{
            active: simple.rightIndex === i,
            passed: simple.goodIndex.includes(i),
          }"
          @click="simpleClick('rightIndex', i)"
        >
          {{ words[wordIndex]?.k }}
        </SimpleButton>
      </div>
    </div>
    <div v-else-if="state.currentMode === ModeType.hard">
      <div v-for="(wordIndex, i) in state.currentWords" :key="i" class="block md:flex gap-4">
        <div class="flex-1 mb-4">
          <SimpleButton
            :class="{
              active: hard.focusIndex === i,
              passed: hard.goodIndex.includes(i),
            }" 
            @click="hardFocusClick(i)"
          >
            <div>{{ words[wordIndex]?.t }}</div>
          </SimpleButton>
        </div>

        <div class="flex-1 mb-4">
          <SimpleButton
            class="passed"
            v-if="hard.goodIndex.includes(i)"
          >{{ words[wordIndex]?.k }}</SimpleButton>
          
          <div class="flex gap-2" v-else>
            <div class="flex flex-1 gap-1" v-if="hard.randomOrders.length">
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
      {{ '\u5df2\u7528\u65f6' }}： {{ state.timeCount }}s
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
