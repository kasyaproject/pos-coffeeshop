import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { ILogin } from "@/types/Auth";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please input your Username/Email"),
  password: yup.string().required("Please input your Password"),
});

const useLoginView = () => {
  const router = useRouter();
  const callbackUrl: string =
    (router.query.callbackUrl as string) || "/dashboard";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // login user melalui API dengan axios
  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (result?.error && result?.status === 401) {
      throw new Error("Email or Password is incorrect");
    }
  };

  // Menangani response dari loginServices jika berhasil/gagal
  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: (error) => {
      toast.error("Login Failed", {
        description: error.message + " 😢",
      });
    },
    onSuccess: () => {
      reset();
      toast.success("Login Success", {
        description: "Welcome to Ticket Portal 😊",
      });
      router.push(callbackUrl);
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLoginView;
