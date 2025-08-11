import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import authServices from '@/services/auth.service';

const useProfileView = () => {
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
}

export default useProfileView
