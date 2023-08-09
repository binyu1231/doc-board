<route lang="yaml">
meta:
  layout: page-not-found
</route>
<script setup lang="ts">
</script>

<template>
  <div class="page-not-found">
    <span>你要找的文章消失了? 请尝试按 <code>/</code> 进行搜索</span>
    <br>
    <router-link to="/">back home</router-link>
  </div>
</template>
<style lang="postcss">
.page-not-found {
  & span {
    @apply font-700;
  }
}
</style>
