---
title: Slot
index: Framework.Vue.Practice
---

[[toc]]


### slot 基本用法

声明

``` html
<template>
  <div class="i-button">
    <slot v-bind="{ foo: 123 }"></slot>
  </div>
</template>
```

使用

``` html
<i-button>
  <template v-slot="{ foo }">{{ foo }}</template>
</i-button>

<!-- 可以省略 template 层 -->
<i-button v-slot="{ foo }">
  {{ foo }}
</i-button>

<!-- 等同于 -->
<i-button v-slot:default="{ foo }">
<!-- 等同于 -->
<i-button #default="{ foo }">


```

### slot 嵌套

声明

``` html
<slot name="footer">
  <ILine />
  <div>
    <slot name="footer-rest"></slot>
    <slot name="footer-cancel-button">
      <IButton @click="handleCancel">
        <slot name="footer-cancel-button-name">
          Cancel
        </slot>
      </IButton>
    </slot>
    <slot name="footer-confirm-button">
      <IButton type="primary" @click="handleConfirm">
        <slot name="footer-confirm-button-name">
          Confirm
        </slot>
      </IButton>
    </slot>
  </div>
</slot>
```

使用

``` html
<IModal :visible="visible" title="你好吗" @close="toggleVisible">
  <p>你好啊</p>

  <template #footer-rest>
    <ICheckbox>
      可选条件
    </ICheckbox>
  </template>

  <template #footer-cancel-button-name>
    取消
  </template>

  <template #footer-confirm-button>
    <IButton color="red" size="sm" type="primary">删除</IButton>
  </template>
</IModal>
```





### 传递组件的所有slots（Vue 3）

``` html
<!--  -->
<template>
    <el-drawer modal-class="detail-drawer" size="60%" v-bind="$attrs">
        <template
            v-for="(_, key, index) in $slots"
            :key="index"
            v-slot:[key]="scope"> <!-- el-drawer 传给template 的参数 -->
            <slot :name="key" v-bind="scope"></slot> <!-- 再将参数向下传递 -->
        </template>
    </el-drawer>
</template>
```

### 利用 slot 透传变量（Vue 3）

声明

``` html
<!-- Shell.vue -->
<script lang="ts" setup>
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

使用

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