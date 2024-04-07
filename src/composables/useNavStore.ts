import metadata from '@/meta/meta-short.json'
import { numberMax } from '@coloration/kit'
import { identity } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export interface NavItem {
  name: string,
  value: string,
  title: string,
  date?: string
}

export interface NavItemGroup {
  name: string
  children: NavItem[]
}

export interface NavCategory {
  name: string,
  children: NavItemGroup[]
}

// global
const navActive = ref({
  category: 0,
  group: 0,
  item: 0,
  path: '/'
})

const navs: NavCategory[] = metadata as any 


export function useNavStore() {
  const router = useRouter()

  function routerRenderWithStore() {
    router.push(`/${navActive.value.path}`)
  }

  function formatNav(path: string) {
    const [categoryPath, groupPath = '', itemPath = ''] = path.split('/').filter(identity)

    let categoryIndex = navs.findIndex((nav) => nav.name.toLowerCase() === categoryPath)
    categoryIndex = numberMax(categoryIndex, 0)
    
    const groups = navs[categoryIndex]?.children || []


    const groupName = groupPath
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
    .replace(/(^\w)|(\s\w)/g, (a) => a.toUpperCase())


    const groupIndex = numberMax(groups.findIndex((group) => {
      return group.name === groupName
    }), 0)

    const itemIndex = numberMax(groups[groupIndex]?.children.findIndex((item) => {
      return item.value.endsWith(itemPath)
    }), 0)

    navActive.value.category = categoryIndex
    navActive.value.group = groupIndex
    navActive.value.item = itemIndex
  }
 

  function changeNav(categoryIndex: number, groupIdx: number = 0, itemIdx: number = 0) {
    const cate = navs.find((_cate, i) => i === categoryIndex)
    const currentNavItem = cate?.children[groupIdx]?.children[itemIdx]
    if (!currentNavItem) return

    navActive.value.path = currentNavItem.value

    routerRenderWithStore()
  }

  return {
    navActive,
    navs,
    changeNav,
    formatNav,
  }
}