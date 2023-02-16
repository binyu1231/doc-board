---
title: 常用 snippets
---

## TypeScript

``` json
{
    "converse default export": {
    "prefix": "$export_default",
    "body": [
        "export { default as $1 } from './$1$2';",
    ],
}
```

## Vue

``` json
{
    "insert vue sfc": {
		"prefix": "$sfc",
		"body": [
			"<script lang=\"ts\" setup>",
			"",
			"</script>",
			"",
			"<template>",
  			"  <div class=\"$1\">",
			"    <!-- -->",
  			"  </div>",
			"</template>",
			"",
			"<style lang=\"postcss\">",
			".$1 {",
  			"  @apply;",
			"}",
			"</style>",
			""
		]
	}
}
```