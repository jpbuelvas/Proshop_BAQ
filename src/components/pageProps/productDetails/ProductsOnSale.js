import React from "react"; 
import { useProducts } from "../../services/productsContext";
import { CircularProgress } from "@mui/material";

const ProductsOnSale = () => {
  const { productos, loading } = useProducts();

  // Obtener 4 productos aleatorios sin duplicados usando Set y Array methods
  const getRandomProducts = (array, num) => {
    const shuffled = Array.from(array).sort(() => Math.random() - 0.5);  // Mezclar el arreglo
    return shuffled.slice(0, num);  // Tomar los primeros 4
  };
  
  // Obtener 4 productos aleatorios
  const randomProducts = getRandomProducts(productos, 4);
  
  if(loading){
    return (
      <div className="flex justify-center items-center h-full">
      <CircularProgress />
      </div>
    )
  }
  return (
    <div>
      <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
        Productos Aleatorios
      </h3>
      <div className="flex flex-col gap-2">
        {randomProducts.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2"
          >
              <img className="w-24 h-24" src={item.imagenes?.[0] || '/no-photo.jpg'} alt={item.nombre} />
            <div className="flex flex-col gap-2 font-titleFont">
              <p className="text-base font-medium">{item.nombre}</p>
              <p className="text-sm font-semibold">${item.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
