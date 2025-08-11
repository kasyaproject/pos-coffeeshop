import React, { ReactNode } from "react";
import PageHead from "@/components/commons/PageHead";
import Image from "next/image";

interface PropTypes {
  title?: string;
  children: ReactNode;
}

const LandingLayout = (props: PropTypes) => {
  const { title, children } = props;

  return (
    <div className="relative flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/img/bg-home.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <PageHead title={title} />

      <section className="max-w-screen-3xl 3xl:container flex p-6">
        {children}
      </section>
    </div>
  );
};

export default LandingLayout;
