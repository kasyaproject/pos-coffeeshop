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

      <section className="max-w-screen-3xl 3xl:container flex p-3 max-md:w-full lg:p-6">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
