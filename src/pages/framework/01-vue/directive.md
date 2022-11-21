

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