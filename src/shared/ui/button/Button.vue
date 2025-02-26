<script setup lang="ts">
import { computed, useSlots, useAttrs } from "vue";
import type { ComponentSize, ComponentColor } from "@/shared/types";

const props = withDefaults(
  defineProps<{
    href?: string;
    size?: ComponentSize;
    color?: ComponentColor;
    variant?: "base" | "outline" | "link";
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    href: undefined,
    size: "md",
    color: "primary",
    variant: "base",
    loading: false,
    disabled: false,
  },
);

const attrs = useAttrs();

const slots = useSlots();

const disabled = computed(() => {
  return props.disabled || props.loading;
});

const classes = computed(() => [
  "btn normal-case no-underline underline-offset-4",
  {
    "btn-disabled": disabled.value,
    [`btn-${props.size}`]: props.size,
    [`btn-${props.variant}`]: props.variant,
    [`btn-${props.color}`]: props.color,
  },
  { "border-2": props.variant === "outline" },
]);
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    role="button"
    v-bind="attrs"
    :class="classes"
    class="hover:text-white!important"
    :disabled="href ? undefined : disabled"
  >
    <span v-if="loading" class="loading loading-spinner loading-sm"></span>

    <slot name="start" />
    <slot></slot>
    <slot name="end" />
  </component>
</template>

<style scoped>
.btn-md {
  @apply min-h-8 h-9;
}
.btn-md.btn-square {
  @apply w-9;
}
.btn-lg {
  @apply min-h-12 h-14 rounded-xl;
}
.btn-link {
  @apply px-0 text-base-content;
}
</style>
