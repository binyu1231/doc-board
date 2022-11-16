<script lang="ts" setup>
const firstDate = new Date('2022-11-21 00:00:00')

function getDate(rowOffset: number) {
  return new Date(firstDate.getTime() + (rowOffset - 1) * 24 * 3600000).getDate()
}
</script>

<template>
  <div class="battle-calendar">
    <!-- -->
    <div class="flex">
      <div 
        class="flex-1 text-center h-10 text-lg font-semibold" 
        v-for="r in ['一', '二', '三', '四', '五', '六', '日']" 
        :key="r">
        {{ r }}
      </div>
    </div>
    <div 
      
      class="border-l border-t border-slate-400 dark:border-slate-700 grid-cols-7 grid">
      <div
        v-for="i in 35"
        :key="i"
        class="relative h-38 border-b border-r border-slate-400 dark:border-slate-700"
        >
        <div class="text-xs whitespace-nowrap relative bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-shadow-sm overflow-hidden py-1 m-1 rounded">
          <i-circle-flags:qa class="absolute text-4xl -left-4 -top-3 opacity-25"/>
          <i-circle-flags:ar class="absolute text-4xl -right-4 -top-3 opacity-25" />
          <div class="relative px-1 w-full z-10 flex justify-between items-center">
            <span class="">卡塔尔</span>
            <span class="">阿根廷</span>
          </div>
        </div>

        <div class="text-xs relative bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-shadow-sm overflow-hidden py-1 m-1 rounded">
          <i-circle-flags:jp class="absolute text-4xl -left-4 -top-3 opacity-25"/>
          <i-circle-flags:de class="absolute text-4xl -right-4 -top-3 opacity-25" />
          <div class="relative px-1 w-full z-10 flex justify-between items-center">
            <span class="">日本</span>
            <span class="">德国</span>
          </div>
        </div>

        <div class="border-b border-slate-200 dark:border-slate-800 mx-2 my-2"></div>

        <div class="text-xs relative bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-shadow-sm overflow-hidden py-1 m-1 rounded">
          <i-circle-flags:dk class="absolute text-4xl -left-4 -top-3 opacity-25"/>
          <i-circle-flags:pt class="absolute text-4xl -right-4 -top-3 opacity-25" />
          <div class="relative px-1 w-full z-10 flex justify-between items-center">
            <span class="">丹麦</span>
            <span class="">葡萄牙</span>
          </div>
        </div>

        <div class="text-xs relative bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-shadow-sm overflow-hidden py-1 m-1 rounded">
          <i-circle-flags:br class="absolute text-4xl -left-4 -top-3 opacity-25"/>
          <i-circle-flags:ca class="absolute text-4xl -right-4 -top-3 opacity-25" />
          <div class="relative px-1 w-full z-10 flex justify-between items-center">
            <span class="">巴西</span>
            <span class="">加拿大</span>
          </div>
        </div>

        <div class="absolute left-0 bottom-0 right-0  text-right px-2 pb-1 flex justify-between items-center">
          <span class="text-xs">第三轮</span>
          <span>{{ getDate(i)}}</span>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style lang="postcss">
.battle-calendar {
  @apply;
}
</style>
