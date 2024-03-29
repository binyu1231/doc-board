---
title: 选择器
---

## 选择器分类

### 基础选择器

|类型|名称|优先级|HTML|
|:---|:---|:---|:---|
|`#gad-1`|ID选择器|1|`<div id="gad-1"></div>`|
|`.container`|类选择器|2|`<div class="container">...</container>`|
|`a[target="_blink"]` <br> `img[title]`|标签属性选择器|3|`<a href="/abc" target="_blank">...</a>`|
|`h1`|类型选择器，标签选择器|4|`<h1>Home Page</h1>`|
|`*`|通配选择器|5|匹配作用域内所有标签|
|`:hover`|伪类选择器|||
|`::before`|伪元素选择器|||

### 复合选择器

|类型|名称|HTML|
|:---|:---|:---|
|`section p`|后代选择器||
|`section > p`|子代选择器||
|`h3 + p`|相邻兄弟选择器||
|`h3 ~ p`|通用兄弟选择器||

## 伪类选择器

> **CSS 伪类**是添加到选择器的关键字，用于指定所选元素的特殊状态

伪类选择器是选择当前元素的某一状态

### 函数式伪类

