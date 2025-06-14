import React from "react";
import Price from "./shopBy/Price";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Size from "./shopBy/Size";

const ShopSideNav = ({
  onPriceRangeSelect,
  onCategorySelect,
  onColorSelect,
  onSizeSelect,
  selectedCategory,
  selectedColor,
  selectedSize,
  selectedPriceRange,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category onCategorySelect={onCategorySelect} selectedCategory={selectedCategory} />
      <Color onColorSelect={onColorSelect} selectedColor={selectedColor} />
      <Size onSizeSelect={onSizeSelect} selectedSize={selectedSize} />
      <Price onPriceRangeSelect={onPriceRangeSelect} selectedPriceRange={selectedPriceRange} />
    </div>
  );
};

export default ShopSideNav;
