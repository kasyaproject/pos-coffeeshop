import { IUpdatePassword } from "@/types/Auth";

const PROFILE_PASSWORD_SECTION: {
  name: keyof IUpdatePassword;
  label: string;
  type: string;
}[] = [
  { name: "oldPassword", label: "Old Password", type: "password" },
  { name: "password", label: "New Password", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password" },
];

export { PROFILE_PASSWORD_SECTION };
