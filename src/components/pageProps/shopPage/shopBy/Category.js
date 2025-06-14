import React from "react";
import NavTitle from "./NavTitle";

const Category = ({ onCategorySelect }) => {
  const items = ["Retro", "Player", "Sport", "Special Style"];

  const handleClick = (cat) => {
    if (onCategorySelect) {
      onCategorySelect(cat);
    }
  };

  return (
    <div className="w-full cursor-pointer">
      <NavTitle title="Comprar por categoría" icons={false} />
      <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
        <li
          key="all"
          onClick={() => handleClick(null)}
          className="border-b-[1px] border-b-[#F0F0F0] pb-2 hover:text-primeColor hover:border-gray-400 duration-300"
        >
          Todas
        </li>
        {items.map((title) => (
          <li
            key={title}
            onClick={() => handleClick(title)}
            className="border-b-[1px] border-b-[#F0F0F0] pb-2 hover:text-primeColor hover:border-gray-400 duration-300"
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
