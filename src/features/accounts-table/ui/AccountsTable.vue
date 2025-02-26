<script setup lang="ts">
import { ref } from "vue";
import type { Account } from "@/shared/types";
import AccountRow from "./AccountRow.vue";
import { useAccountsStore } from "@/shared/stores/accounts";

const tableTitles = ["Метки", "Тип записи", "Логин", "Пароль"];

const accountStore = useAccountsStore();
const updateAccount = (account: Account) => {
  accountStore.updateAccount(account);
};
const deleteAccount = (id: number) => {
  accountStore.deleteAccount(id);
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center w-full justify-between greedy gap-1.5">
      <span v-for="(title, index) in tableTitles" :key="index" class="w-full">
        {{ title }}
      </span>
    </div>
    <div class="flex flex-col gap-8 w-full" v-if="accountStore.accounts.length">
      <AccountRow
        v-for="account in accountStore.accounts"
        :key="account.id"
        :account="account"
        @update:account="updateAccount"
        @delete:account="deleteAccount"
      />
    </div>
    <p v-else class="text-xl font-bold text-center mt-8">Создайте аккаунт</p>
  </div>
</template>

<style scoped>
.greedy :nth-child(even) {
  @apply text-secondary;
}
</style>
