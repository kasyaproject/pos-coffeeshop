import React, { useState } from "react";
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
import { Spinner } from "@/components/ui/spinner";
import { PROFILE_PASSWORD_SECTION } from "./PasswordSection.constant";
import usePasswordSection from "./usePasswordSection";
import { Eye, EyeOff } from "lucide-react";
import { IUpdatePassword } from "@/types/Auth";

const PasswordSection = () => {
  const {
    form,

    isPendingUpdatePassword,
    haldeUpdatePassword,
  } = usePasswordSection();

  // State untuk visibility tiap field
  const [visibleFields, setVisibleFields] = useState<
    Record<keyof IUpdatePassword, boolean>
  >({
    oldPassword: false,
    password: false,
    confirmPassword: false,
  });

  // Fungsi toggle visibility
  const toggleVisibilityPass = (fieldName: keyof IUpdatePassword) => {
    setVisibleFields((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <div className="w-full rounded-md border border-gray-200 p-4 shadow-lg">
      <h1 className="text-lg">Change Password</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(haldeUpdatePassword)}
          className="mt-4 space-y-4 p-2"
        >
          {PROFILE_PASSWORD_SECTION.map((info) => (
            <FormField
              key={info.name}
              control={form.control}
              name={info.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{info.label}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder={info.label}
                        type={visibleFields[info.name] ? "text" : info.type}
                        {...field}
                      />

                      <button
                        className="absolute top-1/2 right-3 -translate-y-1/2"
                        type="button"
                        onClick={() => toggleVisibilityPass(info.name)}
                      >
                        {visibleFields[info.name] ? (
                          <Eye size={17} />
                        ) : (
                          <EyeOff size={17} />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage className="ms-2 -mt-1.5 text-red-500" />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            variant="outline"
            className="text-secondary font-heading bg-highlight cursor-pointer transition-all hover:font-semibold"
          >
            {!isPendingUpdatePassword ? (
              "Change Password"
            ) : (
              <Spinner className="size-5 text-white" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PasswordSection;
