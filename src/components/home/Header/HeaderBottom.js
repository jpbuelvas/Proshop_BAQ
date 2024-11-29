import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProducts } from "../../services/productsContext";

const HeaderBottom = () => {
  const { productos } = useProducts();

  const products = useSelector((state) => state.orebiReducer.products);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filtrar productos basados en la búsqueda del usuario.
  useEffect(() => {
    const filtered = productos.filter((item) =>
      item.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, productos]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24 gap-4">
          {/* Contenedor para la barra de búsqueda e ícono del carrito */}
          <div className="flex items-center justify-end w-full lg:justify-end  gap-4">
            {/* Barra de búsqueda */}
      {/* Barra de búsqueda */}
<div className="relative flex-1 h-[50px] text-base text-primeColor bg-white flex items-center gap-2 px-4 rounded-xl">
  <input
    className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
    type="text"
    onChange={handleSearch}
    value={searchQuery}
    placeholder="Busca tus productos aquí"
  />
  <FaSearch className="w-5 h-5" />
  {/* Resultados de la búsqueda */}
  {searchQuery && (
    <div className="absolute left-0 right-0 top-[60px] z-50 bg-white shadow-2xl overflow-y-scroll max-h-[300px] scrollbar-hide">
      {filteredProducts.map((item) => (
        <div
          key={item.id}
          onClick={() =>
            navigate(
              `/product/${item.nombre.toLowerCase().split(" ").join("")}`,
              {
                state: {
                  item: {
                    _id: item.id,
                    img: item.imagenes?.[0] || "/no-photo.jpg",
                    productName: item.nombre,
                    price: item.precio,
                    color: item.color,
                    badge: true,
                    des: item.descripcion || "Sin descripción disponible.",
                    tallas: item.tallas,
                  },
                },
              }
            ) & setSearchQuery("")
          }
          className="h-28 bg-gray-100 mb-3 flex items-center gap-3 p-2"
        >
          <img
            className="w-24"
            src={item.imagenes?.[0] || "/no-photo.jpg"}
            alt="productImg"
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-lg">{item.nombre}</p>
            <p className="text-sm">
              Precio:{" "}
              <span className="text-primeColor font-semibold">
                ${item.precio}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


            {/* Ícono del carrito */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-[50px] h-[50px] bg-white rounded-full"
            >
              <FaShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                {products.length > 0 ? products.length : 0}
              </span>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
