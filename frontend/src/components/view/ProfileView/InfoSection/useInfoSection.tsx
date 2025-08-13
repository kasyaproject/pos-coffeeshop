import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useProfileView from "../useProfileView";
import authServices from "@/services/auth.service";
import { IUpdateProfileInfo } from "@/types/Auth";

const schemaUpdateInfo = yup.object().shape({
  username: yup.string().required("Please input profile username"),
  fullname: yup.string().required("Please input profile full name"),
  email: yup.string().required("Please input profile email"),
});

const useInfoSection = (profileInfo?: IUpdateProfileInfo) => {
  const { refetchProfile } = useProfileView();

  const form = useForm<IUpdateProfileInfo>({
    resolver: yupResolver(schemaUpdateInfo),
    defaultValues: {
      fullname: profileInfo?.fullname,
      username: profileInfo?.username,
      email: profileInfo?.email,
    },
  });

  // Update Profile API Call
  const updateProfile = async (payload: IUpdateProfileInfo) => {
    const { data } = await authServices.updateProfile(payload);

    return data.data;
  };

  // Mutation untuk update profile
  const { mutate: mutateUpdateProfile, isPending: isPendingUpdateProfile } =
    useMutation({
      mutationFn: (payload: IUpdateProfileInfo) => updateProfile(payload),
      onError: (error) => {
        toast.error("Update Profile Failed", {
          description: error.message + " 😢",
          duration: 3000,
        });
      },
      onSuccess: () => {
        refetchProfile();

        toast.success("Update Profile Success", {
          description: "Success Update profile 😊",
          duration: 3000,
        });
      },
    });

  const handleUpdateProfile = (
    data: IUpdateProfileInfo & Record<string, unknown>,
  ) => {
    const { fullname, username, email } = data;
    mutateUpdateProfile({ fullname, username, email });
  };

  return {
    form,

    handleUpdateProfile,
    isPendingUpdateProfile,
  };
};

export default useInfoSection;
