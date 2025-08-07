import LandingLayout from "@/components/layouts/LandingLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

export default function Home() {
  return (
    <LandingLayout title="Welcome to Our Coffee Shop">
      <div className="flex flex-col items-center justify-center text-center">
        <Image
          src="/img/logo.png"
          alt="logo"
          className="mb-4 h-24 w-24"
          width={400}
          height={400}
        />
        <h1 className="font-heading text-7xl">
          Welcome to Our <span className="text-highlight">Coffee Shop</span>
        </h1>
        <p className="font-body t mt-4 text-2xl">
          Experience the <span className="text-highlight">Best Coffee</span> in
          Town
        </p>

        <Button
          variant="outline"
          className="hover:text-secondary font-heading hover:bg-highlight mt-10 cursor-pointer hover:font-bold"
          onClick={() =>
            toast.success("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              duration: 3000,
            })
          }
        >
          Order Now
        </Button>
      </div>
    </LandingLayout>
  );
}
