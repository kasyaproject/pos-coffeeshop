"use client";

import { IUpdateProfileInfo } from "@/types/Auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useInfoSection from "./useInfoSection";
import { PROFILE_INFO_SECTION } from "./InfoSection.constant";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

interface PropTypes {
  profileInfo: IUpdateProfileInfo;
}

const InfoSection = (props: PropTypes) => {
  const { profileInfo } = props;
  const { form, handleUpdateProfile, isPendingUpdateProfile } =
    useInfoSection(profileInfo);

  useEffect(() => {
    if (profileInfo) {
      form.reset(profileInfo);
    }
  }, [profileInfo, form]);

  return (
    <div className="w-full rounded-md border border-gray-200 p-4 shadow-lg">
      <h1 className="text-lg">Profile Info</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateProfile)}
          className="mt-4 space-y-4 p-2"
        >
          {PROFILE_INFO_SECTION.map((info) => (
            <FormField
              key={info.name}
              control={form.control}
              name={info.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{info.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={info.label}
                      type={info.type}
                      disabled={!!isPendingUpdateProfile}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="ms-2 -mt-1.5 text-red-500" />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            variant="outline"
            // disabled={!!isPendingUpdateProfile}
            className="text-secondary font-heading bg-highlight cursor-pointer transition-all hover:font-semibold"
          >
            {!isPendingUpdateProfile ? (
              "Update Profile"
            ) : (
              <Spinner className="size-5 text-white" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InfoSection;
