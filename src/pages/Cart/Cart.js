import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart, setCartDetails } from "../../redux/orebiSlice";
import ItemCard from "./ItemCard";
import { formatMoney } from "../../components/services/utils";
import WhatsAppButton from "../../components/services/whatsappButton";
import WompiButton from "../../components/services/WompiButton";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: ""
  });
  const isAddressComplete = Object.values(address).every((field) => field.trim() !== "");

  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price);
  }, [products]);
  // Cambia este useEffect
  useEffect(() => {
    if (isAddressComplete) {
      dispatch(setCartDetails(address)); // Debes usar dispatch aquí
    }
  }, [isAddressComplete, address, dispatch]); // Agrega dispatch a las dependencias
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  // Verificar si la dirección está completa
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Carrito" />
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Producto</h2>
            <h2>Precio</h2>
            <h2>Cantidad</h2>
            <h2>Subtotal</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>
          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Vaciar carrito
          </button>
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
              <div className="flex flex-col gap-4 border p-4 rounded-md">
                <h2 className="text-lg font-semibold">Dirección de Envío</h2>
                <input type="text" name="name" placeholder="Nombre" value={address.name} onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="phone" placeholder="Celular" value={address.phone} onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="street" placeholder="Dirección" value={address.street} onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="city" placeholder="Ciudad" value={address.city} onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="state" placeholder="Estado/Región" value={address.state} onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="zip" placeholder="Código Postal" value={address.zip} onChange={handleChange} className="border p-2 rounded" />
              </div>
              <div className="flex justify-end">
                <div className="my-3">
                  {isAddressComplete ? (
                    <WompiButton amount={totalAmt} />
                  ) : (
                    // Solo muestra este bloque cuando la dirección está incompleta
                    <div className="text-center">
                      <button className="py-2 px-8 bg-gray-300 text-gray-600 font-semibold rounded-md cursor-not-allowed" disabled>
                        Completa los datos
                      </button>
                      <p className="text-sm text-gray-500 mt-2">Asegúrate de que todos los campos de la dirección estén llenos.</p>
                    </div>
                  )}
                </div>

              </div>
              <div className="flex flex-col items-end">
                <WhatsAppButton
                  prenda="Carrito completo"
                  talla="N/A"
                  products={products}
                  totalAmt={totalAmt}
                />
                <p className="text-center text-sm text-gray-600 mt-2">
                  📲 Haz clic en el botón de WhatsApp para completar tu pedido y proceder con el pago. Nuestro equipo se pondrá en contacto contigo a la brevedad. 💬
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 pb-20">
          {/* Mensaje de carrito vacío */}
        </div>
      )}
    </div>
  );
};

export default Cart;
