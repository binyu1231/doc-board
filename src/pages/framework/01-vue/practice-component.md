---
title: 实用组件(component)
index: Framework.Vue.Practice
---

[[toc]]

## Normal Component 

## Headless Component

<ToggleContent title="Collapse Transition">

> 橱窗动效，自适应内容高度

#### 声明

``` html
<script setup>
import { nextTick， defineOptions } from 'vue'

defineOptions({
    name: 'collapse-transition'
})

// enter-from
function handleBeforeEnter(el) {
    el.style.height = 0;
    el.style.overflow = 'hidden';
}

// enter-to
function handleEnter(el) {
    el.style.transition = 'height .3s ease'
    nextTick(() => {
        el.style.height = el.scrollHeight + 'px'
    })
}

function handleAfterEnter(el) {
    el.style.transition = 'none'
}

// leave-form
function handleBeforeLeave(el) {
    el.style.transition = 'height .3s ease'
}

function handleLeave(el) {
    el.style.height = 0
}

function handleAfterLeave(el) {
    el.style.transition = 'none'
}


</script>
<template>
<Transition
    @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    @after-enter="handleAfterEnter"
    @before-leave="handleBeforeLeave"
    @leave="handleLeave"
    @after-leave="handleAfterLeave"
>
    <slot></slot>
</Transition>
</template>

```

</ToggleContent>

<ToggleContent title="Shell">

> 声明局部变量，可以减少一些模版中的逻辑代码编写

#### 声明

``` html
<!-- Shell.vue -->
<script lang="ts" setup>
defineOptions({ name: 'Shell' })

withDefaults(
    defineProps<{
        variables?: Record<string, any>
    }>(),
    {
        variables: () => ({})
    }
);
</script>
<template>
  <slot v-bind="variables"></slot>
</template>
```

#### 使用

``` html
<List>
  <ListItem
    v-for="item in list"
    :key="item.id"
  >
    <Shell
      :variable="{ isOnline: item.status === SwitchType.on }"
      :v-slot="{ isOnline }">
      {{ item.name }} {{ isOnline ? '售卖中' : '已下架' }}
      <DeleteButton :disabled="isOnline">
    </Shell>
  </ListItem>
</List>
```

</ToggleContent>