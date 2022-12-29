<script lang="ts" setup>
import { computed, ref } from 'vue';

const value = ref(1);

const props = defineProps<{
  units: string
}>()

const configs = computed(() => {
  return props.units.split(',').map((pair) => {
    const [name, rate] = pair.split('@')
    const [ch, en] = (name || '').split('^')
    return {
      ch,
      en,
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
  <label
    class="unit-group-item"
    v-for="(conf, i) in configs"
    :key="i">
    <span class="ch">{{ conf.ch }}</span>
    <span v-if="conf.en" chass="en">({{ conf.en }})</span>

    <input
      :value="(value * conf.rate)"
      @input="(e: any) => handleChange(e.target.value, conf.rate)"
      type="text"
    />
  </label>
</div>
</template>
<style lang="postcss">
.unit-group {
  @apply grid md:grid-cols-2 2xl:grid-cols-3;
}

.unit-group-item {
  @apply border-l-4 border-indigo-500 pl-2;

  & .ch {
    @apply font-semibold text-lg;
  }

  & input {
    @apply border-b;
  }
}
</style>