<script lang="ts" setup>
// ts-ignore
import { ref, computed, defineOptions } from 'vue'
import { useEventListener } from '@vueuse/core'

import SidebarLinkGroup from './SidebarLinkGroup.vue'
// import SidebarLinkSubgroup from './SidebarLinkSubgroup.vue'
import { useNavStore } from '@/composables'

defineOptions({
  name: 'Sidebar'
})

const props = defineProps<{
  sidebarOpen: boolean
}>()

const emit = defineEmits<{
  'close-sidebar': [],
}>()


const { navs, navActive, changeNav } = useNavStore()
const navGroups = computed(() => navs[navActive.value.category].children || [])
const sidebar = ref(null)

// close on click outside
const clickHandler = ({ target }: any) => {
  if (!sidebar.value) return
  if (
    !props.sidebarOpen ||
    (sidebar.value as any).contains(target)
  ) return
  emit('close-sidebar')
}

// close if the esc key is pressed
const keyHandler = ({ keyCode }: any) => {
  if (!props.sidebarOpen || keyCode !== 27) return
  emit('close-sidebar')
}

useEventListener(document, 'click', clickHandler)
useEventListener(document, 'keydown', keyHandler)
</script>
<template>
  <div>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-out duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >            
      <div v-show="sidebarOpen" class="sidebar-mobile-shadow" aria-hidden="true"></div>
    </transition>
    
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <aside
        id="sidebar"
        class="sidebar"
        ref="sidebar"
        v-show="sidebarOpen"
      >
        <!-- Gradient bg displaying on light layout only -->
        <div class="absolute inset-0 -left-[9999px] bg-gradient-to-b from-slate-50 to-white pointer-events-none -z-10 dark:hidden" aria-hidden="true"></div>
  
        <div class="fixed top-0 bottom-0 w-64 px-4 sm:px-6 lg:pl-0 lg:pr-8 overflow-y-auto no-scrollbar">
          <div class="pt-24 lg:pt-28 pb-8">
  
            <!-- Docs nav -->
            <nav class="lg:block">
              <ul class="text-sm">
                <!-- 1st level -->
                <Scope
                  v-for="(nav, i) in navGroups"
                  :key="i"
                  :variables="{ activeCond: navActive.group === i }"
                  v-slot="{ activeCond }"
                >
                  <SidebarLinkGroup 
                    v-slot="parentLink" 
                    :activeCondition="activeCond">
                    <a
                      class="sidebar-root-link"
                      :class="{ 'before:hidden': !activeCond }"
                      href="#0"
                      @click.prevent="parentLink.handleClick()"
                    >
                      <svg class="mr-3 shrink-0" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path class="fill-purple-400" d="M19.888 7.804a.88.88 0 0 0-.314-.328l-7.11-4.346a.889.889 0 0 0-.927 0L4.426 7.476a.88.88 0 0 0-.314.328L12 12.624l7.888-4.82Z" />
                        <path class="fill-purple-200 dark:fill-slate-800" d="M4.112 7.804a.889.889 0 0 0-.112.43v7.892c0 .31.161.597.426.758l7.11 4.346c.14.085.3.13.464.13v-8.736l-7.888-4.82Z" />
                        <path class="fill-purple-600" d="M19.888 7.804c.073.132.112.28.112.43v7.892c0 .31-.161.597-.426.758l-7.11 4.346c-.14.085-.3.13-.464.13v-8.736l7.888-4.82Z" />
                      </svg>
                      
                      <span>{{ nav.name }}</span>

                      <!-- <div v-if="nav.hasNew" class="sidebar-root-tag"></div> -->
                    </a>
                    <ul class="mb-3 ml-4 pl-6 border-l border-slate-200 dark:border-slate-800" :class="{ 'hidden': !parentLink.expanded }">                    
                      <template
                          v-for="(navChild, j) in nav.children" 
                          :key="j" 
                        >
                        <!-- <SidebarLinkSubgroup 
                          v-if="navChild.children"
                          :title="navChild.name" 
                          :default-open="route.fullPath.includes('alternative-scheme')"
                        >
                          <li class="mt-3" v-for="(navSon, k) in navChild.children" :key="k">
                            <router-link
                              :to="'/' + navSon.value"
                              custom
                              v-slot="{ href, navigate, isExactActive }"
                            >
                              <a
                                class="sidebar-son-link"
                                :class="{ active: isExactActive }"
                                :href="href"
                                @click="navigate"
                              >{{ navSon.name }}</a>
                              <div v-if="navSon.hasNew" class="sidebar-son-tag">1</div>
                            </router-link>
                          </li>
                        </SidebarLinkSubgroup> -->
                        <!-- v-else -->
                        <li 
                          class="mt-3">
                          <!-- <router-link
                          :to="'/' + navChild.value" 
                          custom v-slot="{ href, navigate, isExactActive }"> -->
                          <a 
                          class="flex items-center space-x-3 font-medium relative cursor-pointer" 
                          :class="navActive.group === i && navActive.item === j ? 'text-violet-600' : 'text-slate-800 dark:text-slate-200'" 
                          
                          @click="changeNav(navActive.category, i, j)">
                            {{ navChild.name }}
                            <!-- <div v-if="navChild.hasNew" class="sidebar-son-tag"></div> -->
                          </a>
                          <!-- </router-link> -->
                        </li>
                      </template>
                    </ul>
                  </SidebarLinkGroup>
                </Scope>
              </ul>
            </nav>
          </div>
        </div>
        
        <slot></slot>
      </aside>
    </transition>
  </div>
</template>
<style lang="postcss">
.sidebar-mobile-shadow {
  @apply 
    lg:hidden 
    fixed inset-0 z-80 
    bg-slate-900 bg-opacity-20 transition-opacity;
}



.sidebar {
  @apply 
    fixed left-0 top-0 bottom-0 box-border z-90
    w-64 h-screen border-r border-slate-200 
    
    lg:left-auto lg:shrink-0 lg:!opacity-100 lg:!block 
    dark:border-slate-800 dark:bg-slate-900
    bg-white dark:bg-slate-900;
}

.sidebar-root-link {
  font-family: lobster;
  @apply relative flex items-center text-xl text-slate-800 p-1
  before:absolute before:inset-0 before:rounded before:bg-gradient-to-tr before:from-blue-400 before:to-purple-500 before:opacity-20 before:-z-10 before:pointer-events-none dark:text-slate-200;

  &::before {
    content: "";
  }
}

.sidebar-root-tag {
  @apply absolute right-2 top-3 rounded-full bg-violet-600 dark:bg-violet-700 h-2 w-2 text-xs text-white;
}

.sidebar-son-tag {
  @apply absolute right-2 top-1 rounded-full bg-violet-600 dark:bg-violet-700 h-1.5 w-1.5 text-xs text-white;
}

.sidebar-son-link {
  @apply flex items-center space-x-3 font-normal text-slate-600 dark:text-slate-400;

  &.active {
    @apply text-violet-600;
  }
}
</style>
