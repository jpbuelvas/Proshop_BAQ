import React from "react"; 
import { useProducts } from "../../services/productsContext";
import { CircularProgress } from "@mui/material";
import Heading from "../../home/Products/Heading";
import Product from "../../home/Products/Product";

const ProductsOnSale = () => {
  const { productos, loading } = useProducts();

  // Obtener 5 productos aleatorios
  const getRandomProducts = (array, num) => {
    const shuffled = Array.from(array).sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
  };
  const randomProducts = getRandomProducts(productos, 4);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <Heading heading="Productos Relacionados" />
      <div className="flex flex-wrap justify-center gap-6">
        {randomProducts.map((item) => (
          <Product
            key={item.id}
            _id={item.id}
            img={item.imagenes || "/no-photo.jpg"}
            productName={item.nombre}
            price={item.precio}
            color={item.color}
            badge={true}
            des={item.descripcion || "Sin descripción disponible."}
            tallas={item.tallas}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
