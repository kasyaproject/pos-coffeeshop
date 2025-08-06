import PageHead from "@/components/commons/PageHead";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function Home() {
  return (
    <div className="text-primary grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <Toaster position="top-center" richColors closeButton />
      <PageHead title="Home" />

      <Button
        variant="outline"
        className="hover:text-secondary font-heading hover:bg-primary cursor-pointer"
        onClick={() => toast.error("Event has been created")}
      >
        Show Toast
      </Button>
    </div>
  );
}
