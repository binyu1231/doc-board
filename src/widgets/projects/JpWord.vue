<script lang="ts" setup>
import wordsJSON from '@/meta/meta-word.json'
import { onMounted, reactive, ref, watchEffect, watch } from 'vue'
import { shuffle } from '@/shared'
import { useMagicKeys } from '@vueuse/core'

enum ModeType {
  simple, hard
}

const pickLength = 4
const words = wordsJSON // .slice(0, 8)
const wordLen = words.length

const restIndex = ref<number[]>([])
const passedCount = ref(0)

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

function reset() {
  restIndex.value = shuffle(Array.from({ length: wordLen }).map((_, i) => i))
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

  simple.randomOrders = shuffle(Array.from({ length: count }).map((_, i) => i))
  simple.leftIndex = -1
  simple.rightIndex = -1
  simple.goodIndex = []
  // console.log(restIndex.value)
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

function restart() {
  reset()
  pick(pickLength)
}

watchEffect(() => {
  if (simple.leftIndex !== -1 && simple.leftIndex === simple.rightIndex) {
    simple.goodIndex.push(simple.leftIndex)
    simple.leftIndex = -1
    simple.rightIndex = -1
    passedCount.value++
  }

  if (simple.goodIndex.length === pickLength) {
    pick(pickLength)
  }
})

const watchList = Array.from({ length: pickLength }).map((_, i) => {
  const key = `digit${i + 1}`
  return simplePress[key]
})

watch(watchList, (watchResult) => {
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

onMounted(restart)

</script>

<template>
  <div class="jp-word">
    <!-- -->
    <div class="jp-word-mode jp-word-content mb-4">
      <div
        class="jp-word-btn"
        @click="currentMode = opt.value"
        :class="{ visited: opt.value === currentMode }"
        v-for="opt in modeTypeOption"
        :key="opt.value">{{ opt.name }}
      </div>
      <div class="self-center flex-1 text-right">
        {{ passedCount }} / {{ wordLen }}
      </div>
    </div>
    <div v-if="passedCount === wordLen">
      終わりました，<span class="jp-link-btn" @click="restart">つづく</span>
    </div>
    <div v-else-if="currentWords.length === 0">
      ボタンをください
    </div>
    <div v-else-if="currentMode === ModeType.simple" class="jp-word-content">
      <div class="jp-word-col">
        <div class="jp-word-btn" v-for="(wordIndex, i) in currentWords" :key="i" :class="{
          visited: simple.leftIndex === i,
          passed: simple.goodIndex.includes(i),
        }" @click="simpleClick('leftIndex', i)">
          {{ words[wordIndex].t }}
        </div>
      </div>
      <div class="jp-word-col">
        <div class="jp-word-btn" v-for="(wordIndex, i) in currentWords" :key="i"
          :style="{ order: simple.randomOrders[i], }" :class="{
            visited: simple.rightIndex === i,
            passed: simple.goodIndex.includes(i),
          }" @click="simpleClick('rightIndex', i)">
          {{ words[wordIndex].k }}
        </div>
      </div>
    </div>
    <div v-else-if="currentMode === ModeType.hard">
      DOING
    </div>

    <!-- <div class="jp-word-btn text-center" @click="pick(pickLength)">GO</div> -->
  </div>
</template>

<style lang="postcss">
.jp-word {
  @apply;
}

.jp-word-content {
  @apply flex gap-4;
}

.jp-word-col {
  @apply flex-1 flex flex-col gap-2;
}

.jp-word-btn {
  @apply cursor-pointer hover:bg-violet-100 border-gray border-1 rounded px-4 py-2;

  &.visited {
    @apply border-violet-500 bg-violet-100;
  }

  &.passed {
    @apply bg-gray-100;
  }
}

.jp-link-btn {
  @apply underline hover:text-violet cursor-pointer;
}
</style>
