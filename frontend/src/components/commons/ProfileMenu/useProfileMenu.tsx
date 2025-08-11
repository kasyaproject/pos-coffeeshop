import authServices from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useProfileMenu = () => {
  const { isReady } = useRouter();

  // hit ke API untuk data Profile
  const getProfile = async () => {
    const { data } = await authServices.getProfile();

    return data.data;
  };

  const {
    data: dataProfile,
    refetch: refetchProfile,
    isLoading: isLoadingProfile,
  } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: isReady,
  });

  return { dataProfile, refetchProfile, isLoadingProfile };
};

export default useProfileMenu;
