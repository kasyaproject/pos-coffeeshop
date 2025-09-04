import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const categoryServices = {
  getCategorys: () => instance.get(`${endpoint.CATEGORY}`),
};

export default categoryServices;
