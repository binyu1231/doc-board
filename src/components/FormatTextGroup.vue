<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useStorage } from '@vueuse/core'
enum FormatPattern {
    regexp, string
}

const defaultPattern = { mode: FormatPattern.regexp, value: '\\s', replace: '' }
const state = useStorage('format', { formatText: [{ list: [defaultPattern] }] as any[] }, localStorage)

function addFormat() {
    state.value.formatText.push({ list: [defaultPattern] })
}

function removeFormat(i: number) {
    state.value.formatText.splice(i, 1)
}


function changeItem(item: any, i: number) {
    state.value.formatText[i].list = item
}

onMounted(() => {
    console.log()
})
</script>
<template>
    <div class="relative group" v-for="(item, i) in state.formatText" :key="i">
        <FormatText :matchList="item.list" @change="(item: any) => changeItem(item, i)" />
        <div class="absolute right-1 bottom-1 group-hover:block hidden cursor-pointer" @click="removeFormat(i)">x</div>
        <hr>
    </div>

    <div class="flex gap-4">
        <div class="format-text-group-button text-2xl" @click="addFormat">
            +
        </div>
    </div>
</template>
<style lang="postcss">
.format-text-group-button {
    @apply border-1 rounded-sm flex justify-center items-center cursor-pointer flex-1;
}
</style>