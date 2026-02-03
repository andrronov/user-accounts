<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { Accounts } from "@/widgets/accounts";

useHead({
  title: "Учет пользователей",
});
</script>

<template>
  <Accounts />
</template>
