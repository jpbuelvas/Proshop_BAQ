import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { fetchProducts } from "../../services/utils";
const BestSellers = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde la API
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const products = await fetchProducts(); // Llamada a la función que obtiene productos desde la API
      setProductos(products); 
      console.log(products,"products")
      setLoading(false);
    };

    loadProducts();
  }, []);

  // Mostrar un mensaje de carga mientras los productos se obtienen
  if (loading) {
    return <div>Cargando Productos...</div>;
  }

  return (
    <div className="w-full pb-20">
      <Heading heading="Nuestros más vendidos" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {productos.length > 0 ? (
          productos.map((item) => (
            <Product
              key={item.id}  // Asegúrate de usar el id único del producto
              _id={item.id}
              img={item.imagenes?.[0] || '/no-photo.jpg'}  // Imagen de fallback
              productName={item.nombre}
              price={item.precio}
              color={item.color}
              badge={item.bestSeller}  // Mostrar la insignia si es un Best Seller
              des={item.descripcion || 'Sin descripción disponible.'}  // Descripción de fallback
            />
          ))
        ) : (
          <div>No se encontraron productos</div>
        )}
      </div>
    </div>
  );
};

export default BestSellers;
