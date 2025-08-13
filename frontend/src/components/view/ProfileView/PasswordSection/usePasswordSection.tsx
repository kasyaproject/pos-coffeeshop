import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUpdatePassword } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IServerError } from "@/types/Error";

const schemaUpdatePassword = yup.object().shape({
  oldPassword: yup.string().required("Please insert your old password"),
  password: yup.string().required("Please insert your new password"),
  confirmPassword: yup
    .string()
    .required("Please insert your confirmation password"),
});

const usePasswordSection = () => {
  const form = useForm<IUpdatePassword>({
    resolver: yupResolver(schemaUpdatePassword),
  });

  const {
    formState: { errors: errorsUpdatePassword },
  } = form;

  const updatePassword = async (payload: IUpdatePassword) => {
    const { data } = await authServices.updatePassword(payload);

    return data;
  };

  const { mutate: mutateUpdatePassword, isPending: isPendingUpdatePassword } =
    useMutation({
      mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
      onError: (error: unknown) => {
        const serverError = (
          error as { response?: { data?: IServerError<IUpdatePassword> } }
        )?.response?.data;

        if (serverError?.data) {
          (Object.keys(serverError.data) as (keyof IUpdatePassword)[]).forEach(
            (field) => {
              const message = serverError.data?.[field]; // sekarang TypeScript tahu ini string | undefined
              if (message) {
                form.setError(field, { type: "server", message });
              }
            },
          );
        }

        toast.error("Update Password Failed", {
          description: serverError?.meta?.message || "Something went wrong 😢",
          duration: 3000,
        });
      },
      onSuccess: () => {
        form.reset({
          oldPassword: "",
          password: "",
          confirmPassword: "",
        });

        toast.success("Update Password Success", {
          description: "Success Update Password info 😊",
          duration: 3000,
        });
      },
    });

  const haldeUpdatePassword = (data: IUpdatePassword) =>
    mutateUpdatePassword(data);

  return {
    form,
    errorsUpdatePassword,

    isPendingUpdatePassword,
    haldeUpdatePassword,
  };
};

export default usePasswordSection;
