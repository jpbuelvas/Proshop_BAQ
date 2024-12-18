import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { formatMoney
 } from "../../services/utils";
 import { toast } from "react-toastify";
const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.warn("Por favor, selecciona una talla antes de añadir al carrito.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#ffff",
          color: "#FFC107",
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
        },
      });
      return;
    }
  
    dispatch(
      addToCart({
        _id: productInfo.id,
        name: productInfo.productName,
        quantity: 1,
        image: productInfo.img,
        badge: productInfo.badge,
        price: productInfo.price,
        colors: productInfo.color,
        tallas: selectedSize,
      })
    );
  };
  
  

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">{formatMoney(productInfo.price)}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-sm">Sé el primero en dar el paso</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colores:</span> {productInfo.color}
      </p>
      
      {/* Mostrar tallas disponibles */}
      {productInfo.tallas && productInfo.tallas.length > 0 && (
        <div className="mt-4">
          <p className="font-medium text-lg">
            <span className="font-normal">Tallas disponibles:</span>
          </p>
          <div className="flex gap-2 mt-2">
            {productInfo.tallas.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`py-2 px-4 border-2 rounded-full ${selectedSize === size ? 'bg-primeColor text-white' : 'bg-white text-black border-gray-300'} hover:bg-primeColor hover:text-white transition duration-300`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

<button
  onClick={handleAddToCart}
  className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont mt-4"
>
  Añadir al carrito
</button>

    </div>
  );
};

export default ProductInfo;
