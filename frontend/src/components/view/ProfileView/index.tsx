import React from "react";
import useProfileView from "./useProfileView";
import ImageSection from "./ImageSection";
import InfoSection from "./InfoSection";
import PasswordSection from "./PasswordSection";
import { Spinner } from "@/components/ui/spinner";

const ProfileView = () => {
  const { dataProfile } = useProfileView();

  return (
    <>
      {!!dataProfile ? (
        <div className="flex w-full max-w-5xl flex-col gap-4">
          <ImageSection currentPicture={dataProfile?.profilePicture} />

          <InfoSection profileInfo={dataProfile} />

          <PasswordSection />
        </div>
      ) : (
        <div className="flex h-3/4 w-full flex-col items-center justify-center">
          <Spinner
            size="large"
            className="text-primary items-center justify-center"
          />
          <label className="text-primary text-xl font-semibold">
            Loading...
          </label>
        </div>
      )}
    </>
  );
};

export default ProfileView;
