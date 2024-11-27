import React from "react";
import Price from "./shopBy/Price";

const ShopSideNav = ({ onPriceRangeSelect }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* <Category icons={false} /> */}
      {/* <Color />
      <Brand /> */}
      <Price onPriceRangeSelect={onPriceRangeSelect} />
      </div>
  );
};

export default ShopSideNav;
