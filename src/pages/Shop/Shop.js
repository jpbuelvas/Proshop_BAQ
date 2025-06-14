import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const handlePriceFilter = (range) => {
    setSelectedPriceRange(range);
  };

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Productos" />
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav
            onPriceRangeSelect={handlePriceFilter}
            onCategorySelect={setSelectedCategory}
            onColorSelect={setSelectedColor}
            onSizeSelect={setSelectedSize}
            selectedCategory={selectedCategory}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            selectedPriceRange={selectedPriceRange}
          />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <Pagination
            itemsPerPage={itemsPerPage}
            priceRange={selectedPriceRange}
            category={selectedCategory}
            color={selectedColor}
            size={selectedSize}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
