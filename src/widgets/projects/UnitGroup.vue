<script lang="ts" setup>
import { computed, ref } from 'vue';

const value = ref(1);

const props = defineProps<{
  units: string
}>()

const configs = computed(() => {
  return props.units.split(',').map((pair) => {
    const [name, rate] = pair.split('@')
    return {
      name,
      rate: Number(rate)
    }
  })
})

function handleChange(val: string, rate: number) {
  const newVal = Number(val) / rate
  if (isNaN(newVal)) return
  value.value = newVal
}
</script>
<template>
<div class="unit-group">
  <label v-for="(conf, i) in configs" :key="i">
    <span>{{ conf.name }}</span>
    <input :value="(value * conf.rate)" @input="(e: any) => handleChange(e.target.value, conf.rate)" type="text">
  </label>
</div>
</template>
<style lang="postcss">
.unit-group {
  @apply;
}
</style>