import React from "react";

const WhatsAppButton = ({ products, totalAmt }) => {
  // Construimos el mensaje dinámico
  let message = "Hola, estoy interesado en completar mi compra:\n\n";
  products.forEach((item) => {
    message += `- ${item.name} (${item.quantity}x): $${item.price * item.quantity}\n`;
  });
  message += `\nTotal: $${totalAmt}\n\nGracias.`;

  return (
    <a
      href={`https://wa.me/5733011451419?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        backgroundColor: "#25D366",
        borderRadius: "50%",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        textDecoration: "none",
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="Chat on WhatsApp"
        style={{ width: "32px", height: "32px" }}
      />
    </a>
  );
};

export default WhatsAppButton;
