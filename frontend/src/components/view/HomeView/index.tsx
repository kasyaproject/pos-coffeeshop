import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "sonner";

const HomeView = () => {
  const route = useRouter();
  const session = useSession();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <nav className="absolute top-0 right-10">
        {session.status === "authenticated" ? (
          <Button
            variant="outline"
            className="text-secondary font-heading bg-highlight mt-10 cursor-pointer transition-all hover:font-bold"
            onClick={() => route.push("/member/dashboard")}
          >
            Dashboard
          </Button>
        ) : (
          <Button
            variant="outline"
            className="text-secondary font-heading bg-highlight mt-10 cursor-pointer transition-all hover:font-bold"
            onClick={() => route.push("/auth/login")}
          >
            Login
          </Button>
        )}
      </nav>

      <Image
        src="/img/logo.png"
        alt="logo"
        className="mb-4 h-24 w-24"
        width={400}
        height={400}
      />
      <h1 className="font-heading text-3xl lg:text-7xl">
        Welcome to Our <span className="text-highlight">Coffee Shop</span>
      </h1>
      <p className="font-body t mt-4 lg:text-2xl">
        Experience the <span className="text-highlight">Best Coffee</span> in
        Town
      </p>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          className="hover:text-secondary font-heading hover:bg-highlight mt-10 cursor-pointer transition-all hover:scale-110 hover:font-bold"
          onClick={() => route.push("/order")}
        >
          Order Now
        </Button>

        <Button
          variant="outline"
          className="text-secondary font-heading bg-highlight mt-10 cursor-pointer hover:scale-110"
          onClick={() =>
            toast.success("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              duration: 3000,
            })
          }
        >
          Check your order
        </Button>
      </div>
    </div>
  );
};

export default HomeView;
