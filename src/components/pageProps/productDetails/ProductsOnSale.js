import React from "react"; 
import { useProducts } from "../../services/productsContext";
import { CircularProgress } from "@mui/material";
import { formatMoney } from "../../services/utils";

const ProductsOnSale = () => {
  const { productos, loading } = useProducts();

  // Obtener 5 productos aleatorios
  const getRandomProducts = (array, num) => {
    const shuffled = Array.from(array).sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
  };
  const randomProducts = getRandomProducts(productos, 5);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px] text-center">
        Productos Relacionados
      </h3>
      <div className="mx-auto w-fit flex flex-col gap-2">
        {randomProducts.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2"
          >
            <img
              className="w-24 h-24"
              src={item.imagenes?.[0] || "/no-photo.jpg"}
              alt={item.nombre}
            />
            <div className="flex flex-col gap-2 font-titleFont">
              <p className="text-base font-medium">{item.nombre}</p>
              <p className="text-sm font-semibold">{formatMoney(item.precio)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
