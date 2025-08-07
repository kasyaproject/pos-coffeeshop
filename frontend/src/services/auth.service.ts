import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IActivation, ILogin } from "@/types/Auth";

const authServices = {
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),

  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),

  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/checkMe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default authServices;
