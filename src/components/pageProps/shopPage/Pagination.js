import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { CircularProgress, Box } from "@mui/material";
import { useProducts } from "../../services/productsContext";

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item.id} className="w-full">
            <Product
              _id={item.id}
              img={item.imagenes || "/no-photo.jpg"}
              productName={item.nombre}
              price={item.precio}
              color={item.color}
              badge={true}
              des={item.descripcion || "Sin descripción disponible."}
              tallas={item.tallas}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage, priceRange, category, color, size }) => {
  const { productos, loading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    let filtered = productos;

    if (priceRange) {
      filtered = filtered.filter(
        (product) =>
          product.precio >= priceRange.min && product.precio <= priceRange.max
      );
    }

    if (category) {
      filtered = filtered.filter((product) =>
        product.categoria?.toLowerCase() === category.toLowerCase()
      );
    }

    if (color) {
      filtered = filtered.filter((product) =>
        product.color?.toLowerCase().includes(color.toLowerCase())
      );
    }

    if (size) {
      filtered = filtered.filter((product) =>
        Array.isArray(product.tallas) && product.tallas.includes(size)
      );
    }

    setFilteredProducts(filtered);
    setItemOffset(0);
  }, [priceRange, category, color, size, productos]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          color: "#fff",
        }}
      >
        <CircularProgress color="inherit" size={60} />
      </Box>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-semibold text-gray-600">
          No hay productos disponibles con estos filtros.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />
        <p className="text-base font-normal text-lightText">
          Productos del {itemOffset + 1} al {Math.min(endOffset, filteredProducts.length)} de {filteredProducts.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
