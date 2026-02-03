<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from "vue";
import type { Account, AccountType } from "@/shared/types";
import { ACC_TYPES } from "@/shared/types";
import { Input, Select, Button } from "@/shared/ui";

const props = defineProps<{
  account: Account;
}>();
const emits = defineEmits<{
  "update:account": [account: Account];
  "delete:account": [id: number];
}>();

const accountData = reactive<Account>({
  ...props.account,
});

const tagData = computed({
  get: () => {
    if (!accountData.tag) return "";
    return accountData.tag.map((tag) => tag.text).join("; ");
  },
  set: (value: string) => {
    const tags = value
      .split(";")
      .map((tag) => ({ text: tag.trim() }))
      .filter((tag) => tag.text.length > 0);
    accountData.tag = tags;
  },
});

const validators = computed(() => {
  const validateString = (value: string) => value.length > 0;
  const validateLogin = (value: string) => {
    return value.length <= 50 && validateString(value);
  };
  const validateType = (value: string) => {
    return ACC_TYPES.some((type) => type === value);
  };

  return {
    type: validateType(accountData.type),
    login: validateLogin(accountData.login),
    password:
      accountData.type === "Локальная"
        ? validateString(accountData.password ?? "")
        : true,
  };
});
const isFormValid = computed(() =>
  Object.values(validators.value).every(Boolean),
);

const deleteAccount = () => {
  emits("delete:account", accountData.id);
};

watch(
  () => ({ ...accountData }),
  (newValue) => {
    if (!isFormValid.value) return;
    if (accountData.type === "LDAP") {
      accountData.password = null;
    }
    emits("update:account", newValue);
  },
  { deep: true },
);

const showTooltip = ref(false);
</script>

<template>
  <div class="relative w-full flex flex-col gap-3 sm:gap-1.5">
    <div
      class="flex-col gap-5 sm:gap-2 flex sm:flex-row justify-between items-center"
    >
      <div class="w-full sm:w-1/2 flex justify-between items-center gap-1.5">
        <Input
          class="w-full"
          v-model="tagData"
          @focus="showTooltip = true"
          @blur="showTooltip = false"
        />
        <Select
          class="w-full"
          :options="ACC_TYPES"
          v-model="accountData.type"
        />
        <transition name="fade">
          <div
            v-if="showTooltip"
            class="absolute bg-info text-base-300 p-2 rounded shadow-lg -top-12"
          >
            Вводите теги, разделяя их точкой с запятой.
          </div>
        </transition>
      </div>
      <div class="w-full sm:w-1/2 flex justify-between items-center gap-1.5">
        <Input
          v-model="accountData.login"
          class="w-full"
          show-count
          :class="{ 'border-red-500': !validators.login }"
          :error-message="validators.login ? '' : 'Ошибка'"
          :maxlength="100"
        />
        <Input
          v-if="accountData.type !== 'LDAP'"
          v-model="accountData.password"
          type="password"
          class="w-full"
          :class="{ 'border-red-500': !validators.password }"
          :error-message="validators.password ? '' : 'Ошибка'"
        />
      </div>
    </div>
    <Button
      size="xs"
      variant="outline"
      color="secondary"
      @click="deleteAccount"
    >
      Удалить
    </Button>
  </div>
</template>
