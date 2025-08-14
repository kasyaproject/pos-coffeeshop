import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { Form } from "@/components/ui/form";
import useImageSection from "./useImageSection";

interface PropTypes {
  currentPicture: string;
}

const ImageSection = (props: PropTypes) => {
  const { currentPicture } = props;
  const {
    form,

    handleUploadPicture,
    isPendingUploadFile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
  } = useImageSection(currentPicture);

  const [dataPicture, setDataPicture] = useState<string>(currentPicture);
  const [dataFile, setDataFile] = useState<FileList>();

  // Sinkronisasi saat currentPicture berubah
  useEffect(() => {
    setDataPicture(currentPicture);
  }, [currentPicture]);

  // Reset otomatis setelah update berhasil
  useEffect(() => {
    if (isSuccessUpdateProfile) {
      setDataPicture(currentPicture);
    }
  }, [isSuccessUpdateProfile, currentPicture]);

  // Untuk preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    setDataPicture(URL.createObjectURL(fileList[0])); // preview
    setDataFile(fileList); // simpan FileList di state
  };

  // Submit form → baru upload file
  const handleSubmitFile = () => {
    if (dataFile?.length) {
      handleUploadPicture(dataFile);
    }
  };

  return (
    <div className="w-full rounded-md border border-gray-200 p-4 shadow-lg">
      <h1 className="text-lg">Profile Info</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitFile)}>
          <div className="flex w-40 flex-col items-center justify-center">
            <div className="relative my-4 h-40 w-40">
              <Avatar className="h-full w-full">
                <AvatarImage src={dataPicture} alt="profile-picture" />
              </Avatar>

              <Label
                htmlFor="picture"
                className="group absolute top-1/2 right-1/2 z-10 flex h-40 w-40 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full hover:cursor-pointer hover:bg-gray-700/30"
              >
                <Camera
                  className="text-white/0 group-hover:text-gray-200"
                  size={75}
                />
              </Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                className="hidden"
                {...form.register("picture")}
                onChange={handleFileChange}
              />
            </div>

            <Button
              type="submit"
              variant="outline"
              disabled={!!isPendingUploadFile && !!isPendingUpdateProfile}
              className="text-secondary font-heading bg-highlight cursor-pointer transition-all hover:font-semibold"
            >
              {!isPendingUploadFile ? (
                "Change Picture"
              ) : (
                <Spinner className="size-5 text-white" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ImageSection;
