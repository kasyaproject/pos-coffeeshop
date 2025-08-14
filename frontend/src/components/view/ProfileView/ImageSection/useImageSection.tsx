import useMediaHandling from "@/hooks/useMediaHandling";
import { IProfile } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useProfileView from "../useProfileView";
import authServices from "@/services/auth.service";

const useImageSection = (currentPicture: string) => {
  const { handleUploadFile, handleDeleteFile, isPendingUploadFile } =
    useMediaHandling();
  const { refetchProfile } = useProfileView();
  const form = useForm<{ picture: FileList }>();

  // Update Profile API Call
  const updateProfile = async (payload: IProfile) => {
    const { data } = await authServices.updateProfile(payload);

    return data.data;
  };

  // Mutation untuk update profile
  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingUpdateProfile,
    isSuccess: isSuccessUpdateProfile,
  } = useMutation({
    mutationFn: (payload: IProfile) => updateProfile(payload),
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

  const handleUploadPicture = (files: FileList) => {
    handleUploadFile(files, async (fileUrl?: string) => {
      if (!fileUrl) return;

      // 1️⃣ Hapus foto lama dulu kalau ada
      if (currentPicture) {
        await handleDeletePicture(currentPicture);
      }

      // 2️⃣ Update foto profil di backend
      await mutateUpdateProfileAsync({ profilePicture: fileUrl });
    });
  };

  const handleDeletePicture = (fileUrl: string) => {
    return new Promise((resolve) => {
      handleDeleteFile(fileUrl, () => {
        resolve(true); // selesai hapus
      });
    });
  };

  // Membuat mutate async agar bisa await
  const mutateUpdateProfileAsync = (payload: Partial<IProfile>) => {
    return new Promise((resolve, reject) => {
      mutateUpdateProfile(payload, {
        onSuccess: resolve,
        onError: reject,
      });
    });
  };

  return {
    form,

    handleUploadPicture,
    isPendingUploadFile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
  };
};

export default useImageSection;
