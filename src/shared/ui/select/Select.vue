<script setup lang="ts">
import { useAttrs } from "vue";

defineProps<{
  readonly options: Array<string | number>;
}>();

const attrs = useAttrs();

const modelValue = defineModel<string | number>({
  default: undefined,
});

const handleInput = (event: Event) => {
  const targetValue = (event.target as HTMLSelectElement).value;

  modelValue.value =
    attrs.type === "Number" ? Number(targetValue) : targetValue;
};
</script>

<template>
  <label class="flex flex-col font-medium">
    <div class="flex items-end justify-between font-normal">
      <span class="text-base-content/90">
        <slot></slot>
      </span>
    </div>
    <select
      :value="modelValue"
      @input="handleInput($event)"
      class="p-2 select border-2 border-base-300"
    >
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </label>
</template>

<style>
:root {
  --select-bg: var(--base-100);
}

.input,
.input-disabled {
  background-color: var(--select-bg) !important;
}

.input-disabled {
  border-color: var(--base-300) !important;
}
</style>
