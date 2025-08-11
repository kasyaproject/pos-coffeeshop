import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ILogin {
  identifier: string;
  password: string;
}

// Untuk Registrasi
interface IRegister {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Untuk Activation User
interface IActivation {
  code: string;
}

// Menambahkan data ke User di interface
interface UserExtended extends User {
  id: string;
  accessToken?: string;
  role?: string;
}

// Menambahkan data ke Session di interface
interface SessionExtended extends Session {
  accessToken?: string;
}

// Menambahkan data ke jwt di interface
interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface IProfile {
  _id?: string;
  email?: string;
  fullname?: string;
  isActive?: boolean;
  profilePicture?: string | FileList;
  role?: string;
  username?: string;
}

interface IUpdatePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

declare module "next-auth" {
  interface Session extends SessionExtended {
    user?: UserExtended;
  }

  interface User extends UserExtended {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: User;
    accessToken?: string;
  }
}
export type {
  ILogin,
  IRegister,
  IActivation,
  UserExtended,
  SessionExtended,
  JWTExtended,
  IProfile,
  IUpdatePassword,
};
