import React, { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import useLoginView from "./useLoginView";
import { Spinner } from "@/components/ui/spinner";

const LoginView = () => {
  const {
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin = true,
    errors,
  } = useLoginView();

  const [isVisiblePass, setIsVisiblePass] = useState(false);

  const toggleVisibilityPass = () => setIsVisiblePass(!isVisiblePass);

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-lg border bg-white p-6 shadow-lg sm:w-full lg:w-sm">
      <div className="mb-10 flex flex-col items-center justify-center">
        <AspectRatio
          ratio={16 / 9}
          className="flex w-full items-center justify-center"
        >
          <Image
            src="/img/logo.png"
            alt="Image"
            className="rounded-md object-cover"
            width={100}
            height={100}
          />
        </AspectRatio>

        <h1 className="font-heading mb-4 text-center text-2xl">
          Login to Your Account
        </h1>
      </div>

      <form className="w-full gap-4" onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-4 grid w-full items-center gap-3">
          <Label htmlFor="email">Username/Email</Label>
          <Controller
            name="identifier"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                id="email"
                placeholder="Username/Email"
              />
            )}
          />
          {errors.identifier?.message && (
            <Label htmlFor="errors" className="ms-1.5 -mt-2 text-red-500">
              {errors.identifier?.message}
            </Label>
          )}
        </div>

        <div className="mb-4 grid w-full items-center gap-3">
          <Label htmlFor="password">Password</Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Input
                  {...field}
                  type={isVisiblePass ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                />

                <button
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  type="button"
                  onClick={toggleVisibilityPass}
                >
                  {isVisiblePass ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            )}
          />
          {errors.password?.message && (
            <Label htmlFor="errors" className="ms-1.5 -mt-2 text-red-500">
              {errors.password?.message}
            </Label>
          )}
        </div>

        {errors.root && (
          <p className="text-danger mb-4 text-sm">{errors?.root?.message}</p>
        )}

        <Button
          variant="outline"
          type="submit"
          className="hover:bg-highlight text-highlight border-highlight my-6 w-full cursor-pointer font-semibold hover:text-white"
        >
          {isPendingLogin ? (
            <Spinner className="text-red-400 hover:text-white" size="small" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginView;
