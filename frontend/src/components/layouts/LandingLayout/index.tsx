import React, { ReactNode } from "react";
import PageHead from "@/components/commons/PageHead";

interface PropTypes {
  title?: string;
  children: ReactNode;
}

const LandingLayout = (props: PropTypes) => {
  const { title, children } = props;

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0">
      <PageHead title={title} />

      <section className="max-w-screen-3xl 3xl:container flex p-6">
        {children}
      </section>
    </div>
  );
};

export default LandingLayout;
