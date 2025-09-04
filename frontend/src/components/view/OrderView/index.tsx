import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, UserPen, X } from "lucide-react";
import CartOrder from "./CartOrder";
import { Button } from "@/components/ui/button";
import MenuList from "./MenuList";
import Image from "next/image";
import { IMenu } from "@/types/Menu";
import { ICartItem } from "@/types/Cart";
import Link from "next/link";

const OrderView = () => {
  const [searchMenu, setSearchMenu] = useState("");
  const [formData, setFormData] = useState({
    namaCust: "",
    telpCust: "-",
  });
  const [cart, setCart] = useState<ICartItem[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const namaCust = form.get("namaCust") as string;
    const telpCust = form.get("telpCust") as string;

    // isi state hanya setelah submit
    setFormData({ namaCust, telpCust });
  };

  // fungsi untuk menambah/menghapus item di cart
  const handleAddToCart = (menu: IMenu) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === menu._id);
      if (existing) {
        // jika ada → hapus
        return prevCart.filter((item) => item._id !== menu._id);
      }
      // jika belum ada → tambahkan
      return [...prevCart, { ...menu, qty: 1, _id: menu._id! }];
    });
  };

  const handleIncreaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((it) => (it._id === id ? { ...it, qty: it.qty + 1 } : it)),
    );
  };

  const handleDecreaseQty = (id: string) => {
    setCart((prev) =>
      prev.flatMap((it) => {
        if (it._id !== id) return [it];
        if (it.qty > 1) return [{ ...it, qty: it.qty - 1 }];
        // jika qty == 1 dan dikurangi, hapus item
        return [];
      }),
    );
  };

  return (
    <div className="min-h-screen w-full bg-white/50 shadow-md backdrop-blur-sm">
      {formData.namaCust ? (
        <>
          {/* Header */}
          <div className="flex w-full items-center justify-between gap-6 rounded-lg bg-white px-4 py-2 shadow-md">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/img/logo.png"
                alt="logo"
                className="w-14"
                width={400}
                height={400}
              />
              <p className="text-nowrap">Coffee Shop</p>
            </Link>

            {/* Search */}
            <div className="relative mx-auto flex w-full max-w-4xl items-center">
              <Input
                type="text"
                placeholder="Search Menu..."
                className="h-12 rounded-full pl-10"
                value={searchMenu}
                onChange={(e) => setSearchMenu(e.target.value)}
              />
              <Search size={15} className="absolute left-4 text-gray-700" />

              {searchMenu && (
                <Button
                  variant="ghost"
                  className="absolute right-1 rounded-full hover:bg-gray-200"
                  onClick={() => setSearchMenu("")}
                >
                  <X />
                </Button>
              )}
            </div>

            {/* Cust Detail */}
            <div className="flex items-center justify-end gap-4">
              <div className="-space-y-1.5 text-right">
                <p className="font-semibold text-nowrap">{formData.namaCust}</p>
                <p className="text-sm">{formData.telpCust}</p>
              </div>

              <Button
                variant="outline"
                className="hover:bg-highlight text-highlight border-highlight cursor-pointer font-semibold hover:text-white"
                onClick={() => setFormData({ namaCust: "", telpCust: "" })}
              >
                <UserPen />
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-4 flex w-full max-w-7xl flex-col gap-4 md:flex-row">
            {/* Menu */}
            <div className="flex-1">
              {/* Menu List */}
              <MenuList
                searchMenu={searchMenu}
                onAddToCart={handleAddToCart}
                cart={cart}
              />
            </div>

            {/* Cart */}
            <div className="w-[30%] px-4 py-2 md:px-2 md:py-4">
              <CartOrder
                cart={cart}
                onIncreaseQty={handleIncreaseQty}
                onDecreaseQty={handleDecreaseQty}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-lg flex-col rounded-lg bg-white px-8 pt-4 pb-8 shadow-lg"
          >
            <Link href="/" className="mb-4 flex items-center justify-center">
              <Image
                src="/img/logo.png"
                alt="logo"
                className="w-32"
                width={400}
                height={400}
              />
            </Link>
            <h1 className="text-2xl font-bold">Create new order</h1>
            <p className="text-sm">
              Enter your name and number first to continue
            </p>

            <div className="mt-6">
              <p className="ms-2">Customer Name</p>
              <Input
                type="text"
                name="namaCust"
                placeholder="Enter your Name"
                className="text-black"
                required
              />
            </div>

            <div className="my-3">
              <p className="ms-2">Customer Number</p>
              <Input
                type="text"
                name="telpCust"
                placeholder="Enter your Number"
                className="text-black"
              />
              <span className="text-xs text-gray-500">
                Your phone number will only be used to send the invoice and will
                not be saved. This field is optional and does not need to be
                filled in.
              </span>
            </div>

            <Button
              variant="outline"
              type="submit"
              className="hover:bg-highlight text-highlight border-highlight mt-6 w-full cursor-pointer font-semibold hover:text-white"
            >
              Start Order
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrderView;
