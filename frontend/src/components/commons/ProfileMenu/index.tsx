import React from "react";
import Link from "next/link";
import useProfileMenu from "./useProfileMenu";
import { signOut } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { EllipsisVertical } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileMenu = () => {
  const { dataProfile, isLoadingProfile } = useProfileMenu();
  console.log(dataProfile);

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          disabled={!!isLoadingProfile}
          className="flex w-full items-center justify-between rounded-md px-1.5 py-0.5 hover:cursor-pointer hover:bg-gray-200"
        >
          {/* Image */}
          <Avatar>
            {!!dataProfile ? (
              <AvatarImage
                src={dataProfile?.profilePicture}
                alt="profilePicture"
                className="border border-gray-100 rounded-full"
              />
            ) : (
              <Skeleton className="w-12 h-12 bg-gray-300 rounded-full" />
            )}
          </Avatar>
          {/* Detail */}
          <div className="mx-1.5 line-clamp-1 flex w-full flex-col -space-y-1.5 text-start text-wrap">
            {!!dataProfile ? (
              <>
                <h1 className="text-base">{dataProfile?.fullname}</h1>
                <p className="text-sm text-gray-500">{dataProfile?.email}</p>
              </>
            ) : (
              <>
                <Skeleton className="mb-1.5 h-[10px] w-2/3 rounded-full bg-gray-300" />
                <Skeleton className="h-[10px] w-full rounded-full bg-gray-300" />
              </>
            )}
          </div>
          {/* <Skeleton className="h-[10px] w-full rounded-full bg-gray-300" /> */}
          {/* Icon */}
          <EllipsisVertical />
        </MenubarTrigger>

        <MenubarContent
          className="bg-white border-gray-300"
          align="end"
          sideOffset={5}
          alignOffset={-90}
        >
          <MenubarItem>
            {/* Image */}
            <Avatar>
              <AvatarImage
                src={dataProfile?.profilePicture}
                alt="profilePicture"
                className="border border-gray-100 rounded-full"
              />
            </Avatar>
            {/* Detail */}
            <div className="mx-1 line-clamp-1 flex w-full flex-col -space-y-1.5 text-start text-wrap">
              <h1 className="text-base">{dataProfile?.fullname}</h1>
              <p className="text-sm text-gray-500">{dataProfile?.email}</p>
            </div>
          </MenubarItem>

          <hr className="border-gray-300" />

          <MenubarItem className="hover:cursor-pointer hover:bg-gray-50">
            <Link href="/profile/_id">Profile Setting</Link>
          </MenubarItem>

          <hr className="border-gray-300" />

          <MenubarItem className="hover:bg-gray-50">
            <button
              className="w-full text-start hover:cursor-pointer"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ProfileMenu;
