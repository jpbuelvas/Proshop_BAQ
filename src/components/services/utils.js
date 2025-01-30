import axios from "axios";

// Función para calcular el total de los productos
export const calcularTotal = (productos) => {
  return productos.reduce((total, producto) => {
    return total + producto.precio * producto.cantidad;
  }, 0);
};

// Crear datos del pedido
export const crearPedidoData = (nombre, telefono, direccion, productos) => {
  const total = calcularTotal(productos);
  return { nombre, telefono, direccion, productos, total };
};

// Formatear dinero
export function formatMoney(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(amount);
}

// Obtener productos desde la API
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`); // Usar variable de entorno
    console.log(response,"response")
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error al obtener productos:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error de red o de API:", error);
    return [];
  }
};

// Registrar pedido
export const registrarPedido = async (pedidoData) => {
  try {
    const response = await fetch(process.env.REACT_APP_ORDERS_API, { // Usar variable de entorno
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(pedidoData),
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status} ${response.statusText}`);
    }

    const data = await response.text();
    if (data === "Pedido registrado con éxito") {
      console.log("Pedido registrado correctamente.");
      return true;
    } else {
      throw new Error(data || "Error al registrar el pedido");
    }
  } catch (error) {
    console.error("Error en el registro del pedido:", error);
    throw error;
  }
};
