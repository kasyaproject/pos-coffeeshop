import { IUpdateProfileInfo } from "@/types/Auth";

interface ProfileInfoSectionItem {
  name: keyof IUpdateProfileInfo;
  label: string;
  type: string;
}

const PROFILE_INFO_SECTION: ProfileInfoSectionItem[] = [
  { name: "username", label: "Username", type: "text" },
  { name: "fullname", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
];

export { PROFILE_INFO_SECTION };
