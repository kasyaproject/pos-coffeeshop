import { useState } from "react";
import { Button } from "@/components/ui/button";
import CardMenu from "@/components/commons/CardMenu";
import useMenuList from "./useMenuList";
import { IMenu } from "@/types/Menu";
import { ICategory } from "@/types/Category";

interface PropTypes {
  searchMenu: string;
  onAddToCart?: (menu: IMenu) => void;
  cart: any;
}

const MenuList = (props: PropTypes) => {
  const { searchMenu, onAddToCart, cart } = props;
  const [category, setCategory] = useState("all");

  const { dataMenu, dataCategory } = useMenuList();

  const filteredMenu = dataMenu?.filter((menu: IMenu) => {
    const matchCategory = category === "all" || menu.category === category;
    const matchSearch =
      searchMenu === "" ||
      menu.name.toLowerCase().includes(searchMenu.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="mt-4 rounded-lg bg-white p-4 shadow-md">
      {/* Filter Button */}
      <div className="grid grid-cols-4 items-center gap-4 px-4 py-4">
        <Button
          key="all"
          variant="outline"
          className={
            category === "all"
              ? "bg-highlight border-highlight cursor-pointer font-semibold text-white"
              : "hover:bg-highlight text-highlight border-highlight cursor-pointer font-semibold hover:text-white"
          }
          onClick={() => setCategory("all")}
        >
          All
        </Button>
        {dataCategory?.map((cat: ICategory) => (
          <Button
            key={cat?._id}
            variant="outline"
            className={
              category === cat?._id
                ? "bg-highlight border-highlight cursor-pointer font-semibold text-white"
                : "hover:bg-highlight text-highlight border-highlight cursor-pointer font-semibold hover:text-white"
            }
            onClick={() => setCategory(cat?._id || "")}
          >
            {cat?.name}
          </Button>
        ))}
      </div>

      {/* Menu List */}
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {filteredMenu?.map((menu: IMenu) => {
          const isInCart = cart.some((item: any) => item._id === menu._id);

          return (
            <CardMenu
              key={`menu-list-${menu._id}`}
              menu={menu}
              isInCart={isInCart} // biar bisa kasih highlight
              onClick={() => onAddToCart && onAddToCart(menu)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MenuList;
