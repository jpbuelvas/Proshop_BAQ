import React from "react";
import NavTitle from "./NavTitle";

const Price = ({ onPriceRangeSelect }) => {
  const priceList = [
    { _id: 950, priceOne: 50000, priceTwo: 65000 },
    { _id: 951, priceOne: 65000, priceTwo: 80000 },
    { _id: 952, priceOne: 80000, priceTwo: 95000 },
    { _id: 953, priceOne: 95000, priceTwo: 110000 },
    { _id: 954, priceOne: 110000, priceTwo: 125000 },
    { _id: 955, priceOne: 125000, priceTwo: 140000 },
  ];

  const handleClick = (priceOne, priceTwo) => {
    if (onPriceRangeSelect) {
      onPriceRangeSelect({ min: priceOne, max: priceTwo });
    }
  };

  return (
    <div className="cursor-pointer">
      <NavTitle title="Comprar por precio" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {priceList.map((item) => (
            <li
              key={item._id}
              onClick={() => handleClick(item.priceOne, item.priceTwo)}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;