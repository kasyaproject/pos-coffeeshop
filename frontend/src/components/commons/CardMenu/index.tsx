import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { IMenu } from "@/types/Menu";

interface PropTypes {
  menu?: IMenu;
  key?: string;
  isInCart?: boolean;
  onClick?: () => void;
}

const CardMenu = (props: PropTypes) => {
  const { menu, key, isInCart, onClick } = props;

  return (
    <motion.div
      key={key}
      onClick={onClick}
      whileTap={{ scale: 0.95 }} // efek saat di-click
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-gray-100 shadow-md backdrop-blur-sm transition hover:cursor-pointer",
        isInCart
          ? "border-primary bg-primary/50 text-white"
          : "bg-white/50 hover:bg-gray-100",
      )}
    >
      {/* Star */}
      <div className="absolute top-1 right-1 flex items-center gap-0.5 rounded-full bg-white/50 px-1.5 py-0.5 backdrop-blur-sm">
        <Image
          src="/img/star.png"
          alt="star"
          className="w-4 rounded-md"
          width={400}
          height={400}
        />
        <p className="font-bold">4.5</p>
      </div>

      {/* Image */}
      {/* <Image src={`${menu?.image}`} alt="menu-img" width={600} height={400} /> */}
      {/* Detail */}
      <div className="p-2">
        <h1 className="font-heading text-2xl font-semibold">{menu?.name}</h1>

        <p className="font-bold">Rp. {menu?.price}</p>
      </div>
    </motion.div>
  );
};

export default CardMenu;
