import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import type { Account } from "@/shared/types";

export const useAccountsStore = defineStore("accounts", {
  state: () => ({
    accounts: useStorage<Array<Account>>("accounts", []),
    count: useStorage("count", 0),
  }),

  actions: {
    createAccount() {
      const defaultAccount: Account = {
        id: this.count++,
        tag: [],
        type: "LDAP",
        login: "login",
        password: "password",
      };

      this.accounts.push(defaultAccount);
    },
    deleteAccount(id: number) {
      const foundAccount = this.accounts.find((account) => account.id === id);
      if (foundAccount) {
        this.accounts = this.accounts.filter((account) => account.id !== id);
      }
    },
    updateAccount(account: Account) {
      const foundAccount = this.accounts.find((acc) => acc.id === account.id);
      if (foundAccount) {
        Object.assign(foundAccount, account);
      }
    },
  },
});
