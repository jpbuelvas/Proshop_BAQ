// Importa las dependencias necesarias
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import { formatMoney } from "../../components/services/utils";

// Componente principal del carrito de compras
const Cart = () => {
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux
  const products = useSelector((state) => state.orebiReducer.products); // Obtiene los productos del estado global
  const [totalAmt, setTotalAmt] = useState(""); // Estado para el monto total del carrito

  // Efecto para calcular el monto total del carrito
  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price); // Actualiza el monto total
  }, [products]);


  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Carrito" /> {/* Muestra el rastro de navegación */}
      {products.length > 0 ? ( // Verifica si hay productos en el carrito
        <div className="pb-20">
          {/* Encabezados para la tabla de productos */}
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Producto</h2>
            <h2>Precio</h2>
            <h2>Cantidad</h2>
            <h2>Subtotal</h2>
          </div>

          {/* Lista de productos en el carrito */}
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          {/* Botón para vaciar el carrito */}
          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Vaciar carrito
          </button>

          {/* Sección para cupones y actualización del carrito */}
          <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Número de cupón"
              />
              <p className="text-sm mdl:text-base font-semibold">
                Aplicar cupón
              </p>
            </div>
            <p className="text-lg font-semibold">Actualizar carrito</p>
          </div>

          {/* Resumen de totales del carrito */}
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Totales del carrito</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    {formatMoney(totalAmt)}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    {formatMoney(totalAmt)}
                  </span>
                </p>
                
              </div>
              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Proceder al pago
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Mensaje si el carrito está vacío
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="Carrito vacío"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Tu carrito está vacío.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
            Tu carrito de compras está esperando. Llénalo con camisas deportivas y conjuntos de alta calidad, y prepárate para destacar en cada entrenamiento.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Seguir comprando
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
