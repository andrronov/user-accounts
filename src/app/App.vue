<script setup lang="ts">
import { useSeoMeta } from "@unhead/vue";
import { useRoute } from "vue-router";
import { layouts } from "./layouts";

const route = useRoute();

useSeoMeta({});
</script>

<template>
  <component :is="layouts[route.meta.layout]">
    <router-view />
  </component>
</template>

<style></style>
