import React, { useState } from "react";
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { formatMoney } from "../../services/utils";

const Product = (props) => {
  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Manejo de imágenes múltiples
  const images = Array.isArray(props.img) ? props.img : [props.img];
  const hasMultipleImages = images.length > 1;
  console.log(images,"images")
  const handlePreviousImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Resto de funciones existentes
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  const handleAddToCart = (selectedTalla) => {
    const sizes = props.tallas || [];
    
    if (sizes.length > 1 && !selectedTalla) {
      setShowSizeSelector(true);
      return;
    }

    const finalTalla = selectedTalla || (sizes.length === 1 ? sizes[0] : null);

    dispatch(
      addToCart({
        _id: props._id,
        name: props.productName,
        quantity: 1,
        image: images[currentImageIndex], // Usar imagen actual del carrusel
        badge: props.badge,
        price: props.price,
        colors: props.color,
        tallas: finalTalla,
      })
    );

    setShowSizeSelector(false);
  };

  return (
    <div className="w-full relative group">
      {/* Contenedor del carrusel */}
      <div className="max-w-80 max-h-80 relative overflow-y-hidden group">
        <div className="relative h-80">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                className="w-full h-full object-contain"
                imgSrc={img || "/no-photo.jpg"}
              />
            </div>
          ))}
        </div>

        {/* Controles del carrusel */}
        {hasMultipleImages && (
          <>
            <button
              onClick={handlePreviousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1.5 rounded-full hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1.5 rounded-full hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <FaChevronRight className="text-sm" />
            </button>
            
            {/* Indicadores de posición */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex
                      ? "bg-primeColor"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Elementos existentes */}
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="Descuento" />}
        </div>
        <div className="w-full h-20 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={() => handleAddToCart()}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              {showSizeSelector ? (
                <div className="flex items-center gap-2">
                  {props.tallas.map((talla) => (
                    <button
                      key={talla}
                      className="px-2 py-1 text-xs border rounded hover:bg-primeColor hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(talla);
                      }}
                    >
                      {talla}
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  Añadir al carrito
                  <span>
                    <FaShoppingCart />
                  </span>
                </>
              )}
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Ver detalles
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Contenedor de detalles (se mantiene igual) */}
      <div className="max-w-80 min-h-[200px] py-6 flex flex-col justify-between border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont mb-2">
          <h2 className="text-lg text-primeColor font-bold break-words line-clamp-2">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px] whitespace-nowrap">
            {formatMoney(props.price)}
          </p>
        </div>
        
        <div className="flex-1 overflow-hidden mb-2">
          <p className="text-[#767676] text-[14px] line-clamp-3 break-words">
            {props.des}
          </p>
        </div>
        
        {props.tallas && props.tallas.length > 0 && (
          <div className="text-xs text-gray-500">
            Tallas disponibles: {props.tallas.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;