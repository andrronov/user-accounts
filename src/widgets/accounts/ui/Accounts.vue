<script setup lang="ts">
import { AccountsTable } from "@/features/accounts-table";
import { Button } from "@/shared/ui";
import { useAccountsStore } from "@/shared/stores/accounts";

const accountStore = useAccountsStore();
</script>

<template>
  <div class="flex flex-col gap-8 mt-16 px-2">
    <div class="flex items-center gap-4">
      <h1 class="text-2xl font-bold">Учетные записи</h1>
      <Button size="md" color="primary" @click="accountStore.createAccount()">
        Создать
      </Button>
    </div>
    <AccountsTable />
  </div>
</template>
