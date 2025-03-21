import React, { useEffect, useState, memo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import { useProducts } from "../../components/services/productsContext";
import { CircularProgress, Box } from "@mui/material";

//El componente memorizado
const MemoizedProductsOnSale = memo(ProductsOnSale);

const ProductDetails = () => {
  const location = useLocation();
  const { _id } = useParams(); // Extraemos el slug de la URL
  const { productos } = useProducts(); // Obtenemos los productos del contexto o backend
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Reiniciamos el estado de carga cada vez que se actualizan las dependencias
    setIsLoading(true);

    // Si se navegó con estado, lo usamos
    if (location.state && location.state.item) {
      setProductInfo(location.state.item);
      setPrevLocation(location.pathname);
      setIsLoading(false);
    } else if (productos && productos.length > 0 && _id) {
      const foundProduct = productos.find((p) => {
        return p.id === Number(_id);
      });
      if (foundProduct) {
        setProductInfo({
          ...foundProduct,
          img: foundProduct.imagenes,
          price: foundProduct.precio,
          productName: foundProduct.nombre,
          des: foundProduct.descripcion,
        });
      } else {
        setProductInfo(null);
      }
      setPrevLocation(location.pathname);
      setIsLoading(false);
    }
  }, [location, productos, _id]);

  // Si aún está cargando, se puede mostrar un spinner o simplemente nada
  if (isLoading) {
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
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
        zIndex: 9999,
        color: "#fff", // Hace que el spinner herede el color blanco
      }}
    >
      <CircularProgress color="inherit" size={60} />
    </Box>
    );
  }

  // Si ya terminó la carga y no se encontró el producto, mostramos un mensaje
  if (!productInfo) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-bold">Producto no encontrado.</h2>
      </div>
    );
  }

  // Normalizar las imágenes a array
  const images = Array.isArray(productInfo.img)
    ? productInfo.img
    : [productInfo.img];
  const hasMultipleImages = images.length > 1;

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full order-3 xl:order-1">
            <MemoizedProductsOnSale />
          </div>
          <div className="xl:col-span-2 relative group order-1 xl:order-2">
            <div className="relative h-full w-full overflow-hidden">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={img}
                    alt={`Product view ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            {hasMultipleImages && (
              <>
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <FaChevronLeft className="text-lg" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <FaChevronRight className="text-lg" />
                </button>

                <div className="relative overflow-hidden min-h-[400px]">
                  {images.length > 0 ? (
                    images.map((img, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          index === currentImageIndex ? "opacity-100" : "opacity-0"
                        }`}
                      ></div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No hay imagen disponible
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center order-2 xl:order-3">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
