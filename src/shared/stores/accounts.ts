import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import type { Account } from "@/shared/types";

export const useAccountsStore = defineStore("accounts", () => {
  const accounts = useStorage<Account[]>("accounts", []);
  const count = useStorage("count", 0);

  const createAccount = () => {
    const defaultAccount: Account = {
      id: count.value++,
      tag: [],
      type: "LDAP",
      login: "login",
      password: "password",
    };

    accounts.value.push(defaultAccount);
  };

  const deleteAccount = (id: number) => {
    const foundAccount = accounts.value.find((account) => account.id === id);
    if (foundAccount) {
      accounts.value = accounts.value.filter((account) => account.id !== id);
    }
  };
  const updateAccount = (account: Account) => {
    const foundAccount = accounts.value.find((acc) => acc.id === account.id);
    if (foundAccount) {
      Object.assign(foundAccount, account);
    }
  };

  return {
    accounts,
    createAccount,
    deleteAccount,
    updateAccount,
  };
});
