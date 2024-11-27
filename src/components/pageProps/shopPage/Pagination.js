import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { fetchProducts } from "../../services/utils";

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item.id} className="w-full">
            <Product
              _id={item.id}
              img={item.imagenes?.[0] || "/no-photo.jpg"}
              productName={item.nombre}
              price={item.precio}
              color={item.color}
              badge={true}
              des={item.descripcion || "Sin descripción disponible."}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage, priceRange }) => {
  const [productos, setProductos] = useState([]); // Todos los productos
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0); // Desplazamiento inicial para paginación

  // Cargar productos al inicio
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const products = await fetchProducts(); // Llama al servicio para obtener productos
      setProductos(products);
      setFilteredProducts(products); // Inicialmente sin filtro
      setLoading(false);
    };

    loadProducts();
  }, []);

  // Filtrar productos según el rango de precios
  useEffect(() => {
    if (priceRange) {
      const filtered = productos.filter(
        (product) =>
          product.precio >= priceRange.min && product.precio <= priceRange.max
      );
      setFilteredProducts(filtered);
      setItemOffset(0); // Reinicia el desplazamiento al cambiar el filtro
    } else {
      setFilteredProducts(productos); // Sin filtro, muestra todos los productos
    }
  }, [priceRange, productos]);

  // Productos actuales para la página
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // Manejar cambio de página
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-semibold text-gray-600">
          Cargando Productos.
        </p>
      </div>
    );
  }

  // Si no hay productos filtrados, mostrar mensaje
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-semibold text-gray-600">
          No hay productos disponibles en este rango de precios.
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
          Productos del {itemOffset + 1} al {Math.min(endOffset, filteredProducts.length)} de{" "}
          {filteredProducts.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
