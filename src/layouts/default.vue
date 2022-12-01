<script lang="ts" setup>
import { ref } from 'vue'
import metadata from '@/meta/short.json'
const sidebarOpen = ref(false)
const navs = ref(metadata[0].children)

function handleChange(key: string, i: number) {
  navs.value = metadata[i].children
  sidebarOpen.value = true
}

function openSidebar(e: Event) {
  e.stopPropagation()
  sidebarOpen.value = true
}
</script>
<template>
<div class="bg">
  <img src="@/assets/hero-illustration.svg" alt="">
</div>
<div class="doc">
  <Header 
    :metadata="metadata" 
    @change="handleChange" 
  ></Header>
  <div class="doc-container">
    <Sidebar 
      :sidebarOpen="sidebarOpen"
      @close-sidebar="sidebarOpen = false" 
      :navs="navs"
    />
    <div class="sidebar-flat-btn" @click="openSidebar">
      <i-akar-icons:book />
    </div>
    <div class="doc-body">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>
<style lang="postcss">
.bg {
  @apply fixed;
}
.doc-container {
  @apply relative pt-24 lg:pt-28 pb-8 px-4 sm:px-6 lg:pr-12 xl:pr-60;
}

.doc-body {
  @apply lg:grow lg:pl-76 lg:pr-6 xl:pr-0;
}

.sidebar-flat-btn {
  @apply
    flex items-center justify-center text-xl
    lg:hidden fixed bottom-4 z-80 
    w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-1 border-slate-500;
    ;
}

.table-of-contents {
  @apply hidden xl:block w-48
    fixed right-0 bottom-0 h-[calc(100vh-5rem)] w-48 overflow-y-auto pt-32 pb-8 no-scrollbar
    border-l border-slate-200 dark:border-slate-800 text-sm
  ;
  & ol {
    @apply list-none pl-0;
  }
  & ol ol {
    @apply hidden;
  }
  & a {
    @apply 
      relative block font-normal 
      text-violet-600 pl-4 py-1.5 
      before:absolute before:-left-px before:top-2 before:bottom-2 before:w-0.5
      decoration-none;
  }
}
</style>