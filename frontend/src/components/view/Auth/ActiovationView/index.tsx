import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

interface PropTypes {
  status: "success" | "failed";
}

const ActiovationView = (props: PropTypes) => {
  const route = useRouter();
  const { status } = props;

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Image
        src="/img/logo.png"
        alt="logo"
        className="mb-4 h-24 w-24"
        width={400}
        height={400}
      />

      {status === "success" ? (
        <h1 className="font-heading text-7xl">
          Welcome to Our <span className="text-highlight">Coffee Shop</span>{" "}
          Team
        </h1>
      ) : (
        <h1 className="font-heading text-7xl">
          Activation <span className="text-highlight">Failed!</span>
        </h1>
      )}

      {status === "success" ? (
        <p className="font-body mt-4 text-2xl">
          Let’s brew <span className="text-highlight">great moments</span>{" "}
          together!
        </p>
      ) : (
        <p className="font-body mt-4 text-2xl">Confirmation code is invalid</p>
      )}

      <Button
        variant="outline"
        className="hover:text-secondary font-heading hover:bg-highlight mt-10 cursor-pointer hover:font-bold"
        onClick={() => route.push("/auth/login")}
      >
        Back to Login
      </Button>
    </div>
  );
};

export default ActiovationView;
