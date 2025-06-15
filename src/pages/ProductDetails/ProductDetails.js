import { Box, CircularProgress } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import { useProducts } from "../../components/services/productsContext";

// El componente memorizado
const MemoizedProductsOnSale = memo(ProductsOnSale);

const ProductDetails = () => {
  const location = useLocation();
  const { _id } = useParams();
  const { productos } = useProducts();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    // Si se navegó con estado
    if (location.state && location.state.item) {
      setProductInfo(location.state.item);
      setPrevLocation(location.pathname);
      setIsLoading(false);
    } else if (productos && productos.length > 0 && _id) {
      const foundProduct = productos.find((p) => p.id === Number(_id));
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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          color: "#fff",
        }}
      >
        <CircularProgress color="inherit" size={60} />
      </Box>
    );
  }

  if (!productInfo) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-bold">Producto no encontrado.</h2>
      </div>
    );
  }

  // Normalizar las imágenes
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">

          <div className="xl:col-span-2 relative group order-1 xl:order-2 flex items-center">
            <div className="relative w-full overflow-hidden min-h-[300px] h-[70vh]">
              
              
             <img
                src={images[0]}
                alt=""
                className="w-full h-auto invisible"
              />
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
              </>
            )}
          
          </div>

          <div className="w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center order-2 xl:order-3 ">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
        <MemoizedProductsOnSale />
      </div>
    </div>
  );
};

export default ProductDetails;
