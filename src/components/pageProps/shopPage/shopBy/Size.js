import React from "react";
import NavTitle from "./NavTitle";

const Size = ({ onSizeSelect }) => {
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleClick = (size) => {
    if (onSizeSelect) {
      onSizeSelect(size);
    }
  };

  return (
    <div className="cursor-pointer">
      <NavTitle title="Comprar por talla" icons={false} />
      <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
        {sizes.map((size) => (
          <li
            key={size}
            onClick={() => handleClick(size)}
            className="border-b-[1px] border-b-[#F0F0F0] pb-2 hover:text-primeColor hover:border-gray-400 duration-300"
          >
            {size}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Size;
