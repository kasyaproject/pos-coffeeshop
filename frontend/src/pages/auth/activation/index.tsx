import AuthLayout from "@/components/layouts/AuthLayout";
import ActiovationView from "@/components/view/Auth/ActiovationView";
import authServices from "@/services/auth.service";
import React from "react";

interface PropsType {
  status: "success" | "failed";
}

const ActivationPage = (props: PropsType) => {
  return (
    <AuthLayout title="POS CoffeShop | Activation Page">
      <ActiovationView {...props} />
    </AuthLayout>
  );
};

// Jalankan fungsi authServices.activation() sebelum halaman dikirim ke klien untuk mendapatkan data aktivasi
export async function getServerSideProps(context: { query: { code: string } }) {
  try {
    const result = await authServices.activation({ code: context.query.code });

    // Jika proses aktivasi berhasil, kembalikan props dengan status "success"
    if (result.data.data) {
      return {
        props: {
          status: "success",
        },
      };
    } else {
      return {
        props: {
          status: "failed",
        },
      };
    }
  } catch (error) {
    console.error(error);
  }
}

export default ActivationPage;
