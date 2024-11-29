import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { useProducts } from "../../services/productsContext";
import { CircularProgress } from "@mui/material";

const BestSellers = () => {
  const { productos, loading } = useProducts();
  console.log(productos, "productos");

  // Lista de los IDs de productos que queremos mostrar
  const selectedIds = [1, 2, 4, 9, 17, 24,27,21];

  // Filtrar los productos por los IDs seleccionados
  const filteredProducts = productos.filter((item) => selectedIds.includes(item.id));

  // Mostrar un mensaje de carga mientras los productos se obtienen
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      <Heading heading="Más vendidos" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Product
              key={item.id} // Agregar una clave única aquí para evitar errores
              _id={item.id}
              img={item.imagenes?.[0] || "/no-photo.jpg"}
              productName={item.nombre}
              price={item.precio}
              color={item.color}
              badge={true}
              des={item.descripcion || "Sin descripción disponible."}
              tallas={item.tallas} // Aquí estamos pasando la propiedad 'tallas'
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
