import { ReactNode } from "react";
import PageHead from "@/components/commons/PageHead";
import Image from "next/image";

interface PropTypes {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: PropTypes) => {
  const { title, children } = props;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/img/bg-auth.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <PageHead title={title} />

      <section className="flex w-full max-w-sm p-3 sm:mx-10 md:mx-10 lg:max-w-lg lg:p-6">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
