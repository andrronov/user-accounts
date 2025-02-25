const ACC_TYPES = ["LDAP", "Локальная"] as const;
export type AccountType = typeof ACC_TYPES[number];

export type Account = {
    tag: Array<string>,
    type: AccountType,
    login: string,
    passpord: string
}