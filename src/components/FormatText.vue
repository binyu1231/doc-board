<script setup lang="ts">
import { ref, watchEffect, withDefaults } from 'vue'
import { useClipboard, useTimeout } from '@vueuse/core'
enum FormatPattern {
    regexp, string
}

const props = withDefaults(
    defineProps<{
        matchList: any[]
    }>(),
    {
        matchList: () => []
    }
)

const emits = defineEmits<{
    (e: 'change', list: any[]): void
}>()


const inputText = ref('')
const outputText = ref('')


const copyText = ref('Copy')
const { copy } = useClipboard() 

function togglePattern(i: number) {
    const newPattern = props.matchList[i].mode === FormatPattern.regexp ? FormatPattern.string : FormatPattern.regexp;
    const newList = props.matchList.slice()
    newList[i].mode = newPattern
    emits('change', newList)
}

function addMatch(i: number) {
    const newList = props.matchList.slice()
    newList.splice(i, 0, { mode: FormatPattern.regexp, value: '\\s', replace: '' })
    emits('change', newList)
}

function removeMatch(i: number) {
    const newList = props.matchList.slice()
    newList.splice(i, 1)
    emits('change', newList)

}

function copyContent() {
    copy(outputText.value)
    copyText.value = 'Copied!'
    setTimeout(() => {
        copyText.value = 'Copy'
    }, 500)
}

watchEffect(() => {
    try {
        const formatText = props.matchList.reduceRight((text, matchText) => {
            const replaceMode = matchText.mode === FormatPattern.string
                ? new RegExp(`(${matchText.value})`, 'g')
                : new RegExp(matchText.value, 'g')

            return text.replace(replaceMode, matchText.replace)
        }, inputText.value)

        
        outputText.value = formatText
    }
    catch {
        //
    }
})
</script>
<template>
<div class="format-text">
    <div class="format-text-row" v-for="(matchText, i) in matchList" :key="i">
        <div class="flex flex-1">
            <div class="ft-border-color cursor-pointer w-6 text-center mr-1" @click="togglePattern(i)">
                {{ matchText.mode === FormatPattern.regexp ? '正' : 'S' }}
            </div>
            <input type="text" placeholder="输入匹配内容" v-model="matchText.value" />
        </div>
        <div class="flex flex-1">
            <input type="text" placeholder="输入替换文字" v-model="matchText.replace" />
            <div class="cursor-pointer w-6 text-center ml-2 ft-border-color flex items-center justify-center" @click="addMatch(i)">
                <i-akar-icons-plus />
            </div>
            <div class="ft-border-color cursor-pointer w-6 text-center ml-1 ft-border-color flex items-center justify-center" @click="removeMatch(i)" v-if="i !== 0">
                <i-akar-icons-minus />
                
            </div>
        </div>
    </div>
    <div class="format-text-row">
        <textarea v-model="inputText" placeholder="粘贴文字" class="flex-1 p-2 ft-border-color"></textarea>
        <div class="flex-1 p-2 relative ft-border-color">
            {{ outputText }}
            <div class="absolute right-2 bottom-2 text-sm cursor-pointer text-violet-500" @click="copyContent">{{ copyText }}</div>
        </div>
    </div>
</div>
</template>
<style lang="postcss">
.ft-border-color {
    @apply border-gray-400 dark:border-gray-500 border-1 rounded-sm text-gray-500 dark:text-gray-400;
}
.format-text {
    & input {
        @apply border-b flex-1 border-gray-400 dark:border-gray-500;
    }
}

.format-text-row {
    @apply flex gap-4 mb-4;
}
</style>