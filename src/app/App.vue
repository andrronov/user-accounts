<script setup lang="ts">
import { useRoute } from "vue-router";
import { layouts } from "./layouts";

const route = useRoute();
</script>

<template>
  <component :is="layouts[route.meta.layout]">
    <router-view />
  </component>
</template>

<style></style>
