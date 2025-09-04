import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const menuServices = {
  getMenus: (params?: string) => instance.get(`${endpoint.MENU}?${params}`),
};

export default menuServices;
