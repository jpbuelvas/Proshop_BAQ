import React from "react";
import { useSelector } from "react-redux";
import WhatsAppButton from "./whatsappButton";
import { formatMoney } from "../../components/services/utils";

const WhatsAppPayment = () => {
  const products = useSelector((state) => state.orebiReducer.products);

  // Construir mensaje con productos del carrito
  let message = "Hola, estoy interesado en completar mi compra:\n\n";
  let totalAmt = 0;
  products.forEach((item) => {
    message += `- ${item.name} (${item.quantity}x): ${formatMoney(item.price * item.quantity)}\n`;
    totalAmt += item.price * item.quantity;
  });
  message += `\nTotal: ${formatMoney(totalAmt)}\n\nGracias.`;

  return (
    <div className="max-w-container mx-auto px-4 py-20">
      <h1 className="text-2xl font-semibold text-center mb-10">
        ¡Gracias por tu compra! Nos contactaremos contigo pronto.
      </h1>
      <WhatsAppButton prenda="Compra completa" talla="N/A" message={message} />
    </div>
  );
};

export default WhatsAppPayment;
