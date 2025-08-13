import uploadServices from "@/services/media.service";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useMediaHandling = () => {
  // Untuk Upload Gambar
  const uploadFile = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    const {
      data: {
        data: { secure_url: fileUrl },
      },
    } = await uploadServices.uploadFile(formData);

    callback(fileUrl);
  };

  const { mutate: mutateUploadFile, isPending: isPendingUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadFile(variables.file, variables.callback),
      onError: (error) => {
        toast.error("Upload file failed", {
          description: error.message + " 😢",
          duration: 3000,
        });
      },
    });

  // Untuk upload image agar bisa di preview
  const handleUploadFile = (
    files: FileList,
    callback: (fileUrl?: string) => void,
  ) => {
    if (files.length !== 0) {
      mutateUploadFile({
        file: files[0],
        callback,
      });
    }
  };

  // Untuk Delete Gambar
  const deleteFile = async (fileUrl: string, callback: () => void) => {
    const response = await uploadServices.deleteFile({ fileUrl });

    if (response.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateDeleteFile, isPending: isPendingDeleteFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteFile(variables.fileUrl, variables.callback),
      onError: (error) => {
        toast.error("Delete file failed", {
          description: error.message + " 😢",
          duration: 3000,
        });
      },
    });

  // Untuk delete image
  const handleDeleteFile = (
    fileUrl: string | FileList | undefined,
    callback: (files?: FileList | undefined) => void,
  ) => {
    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback });
    } else {
      callback();
    }
  };

  return {
    mutateUploadFile,
    isPendingUploadFile,
    mutateDeleteFile,
    isPendingDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  };
};

export default useMediaHandling;
