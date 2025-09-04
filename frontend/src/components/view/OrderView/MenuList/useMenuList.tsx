import categoryServices from "@/services/category.service";
import menuServices from "@/services/menu.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useMenuList = () => {
  const router = useRouter();

  const getCategorys = async () => {
    const res = await categoryServices.getCategorys();
    const { data } = res;

    console.log(data);
    return data.data;
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Categorys"],
    queryFn: () => getCategorys(),
    enabled: router.isReady,
  });

  const getMenus = async () => {
    const params = `limit=50&page=1&isActive=true`;

    const res = await menuServices.getMenus(params);
    const { data } = res;

    return data.data;
  };

  const { data: dataMenu, isLoading: isLoadingMenu } = useQuery({
    queryKey: ["Menus"],
    queryFn: () => getMenus(),
    enabled: router.isReady,
  });

  return { dataMenu, isLoadingMenu, dataCategory };
};

export default useMenuList;
