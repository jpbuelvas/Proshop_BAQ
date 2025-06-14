import React from "react";
import Price from "./shopBy/Price";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Size from "./shopBy/Size";

const ShopSideNav = ({ onPriceRangeSelect, onCategorySelect, onColorSelect, onSizeSelect }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category onCategorySelect={onCategorySelect} />
      <Color onColorSelect={onColorSelect} />
      <Size onSizeSelect={onSizeSelect} />
      <Price onPriceRangeSelect={onPriceRangeSelect} />
    </div>
  );
};

export default ShopSideNav;
