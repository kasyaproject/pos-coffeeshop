import LandingLayout from "@/components/layouts/LandingLayout";
import HomeView from "@/components/view/HomeView";

export default function Home() {
  return (
    <LandingLayout title="POS CoffeShop">
      <HomeView />
    </LandingLayout>
  );
}
