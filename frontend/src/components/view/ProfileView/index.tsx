import React from 'react'
import useProfileView from './useProfileView'
import ImageSection from './ImageSection';
import InfoSection from './InfoSection';
import PasswordSection from './PasswordSection';

const ProfileView = () => {
    const { dataProfile, refetchProfile, isLoadingProfile } = useProfileView();

  return (
    <div>
          <ImageSection />
          <InfoSection />
          <PasswordSection/>
    </div>
  )
}

export default ProfileView
