---
title: directive 指令
index: Framework.Vue.Syntax
---

[[toc]]

## 声明

``` ts
function formatSize (el) {
  el.style.height = el.offsetWidth + 'px'
}

Vue.directive('square', {
  inserted: formatSize,
  // update: formatSize,
  componentUpdated: formatSize,

})
```