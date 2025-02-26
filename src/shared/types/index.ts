export const ACC_TYPES = ["LDAP", "Локальная"] as const;
export type AccountType = (typeof ACC_TYPES)[number];

export type Tag = {
  text: string;
};

export type Account = {
  id: number;
  tag?: Array<Tag>;
  type: AccountType;
  login: string;
  password: string | null;
};

export type ComponentSize = "xs" | "md" | "lg" | "xl";
export type ComponentColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
