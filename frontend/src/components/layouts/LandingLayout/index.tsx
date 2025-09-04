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
    <div className="relative min-h-screen w-full">
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

      <section>{children}</section>
    </div>
  );
};

export default LandingLayout;
