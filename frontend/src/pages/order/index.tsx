import LandingLayout from "@/components/layouts/LandingLayout";
import OrderView from "@/components/view/OrderView";
import React from "react";

const OrderPage = () => {
  return (
    <LandingLayout title="POS CoffeShop | Order">
      <OrderView />
    </LandingLayout>
  );
};

export default OrderPage;
