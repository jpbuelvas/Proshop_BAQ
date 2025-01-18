import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { formatMoney } from '../../components/services/utils';
import { useDispatch } from 'react-redux';
import {
    resetCart
  } from "../../redux/orebiSlice";
const PaymentResult = () => {
  const location = useLocation();
  const [transactionData, setTransactionData] = useState(null);
  const dispatch = useDispatch(); // Hook de dispatch para enviar acciones

  useEffect(() => {
    const transactionId = new URLSearchParams(location.search).get('id');

    if (transactionId) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/wompi/transaction-status?id=${transactionId}`)
        .then((response) => {
          setTransactionData(response.data.data);

          // Si el pago fue exitoso, resetear los productos
          if (response.data.data.status === 'APPROVED') {
            dispatch(resetCart()); // Despachar la acción para resetear los productos
          }
        })
        .catch((error) => console.error('Error fetching transaction status:', error));
    }
  }, [location.search, dispatch]);

  return (
    <div className="container mx-auto p-5 font-sans">
      <h2 className="text-2xl font-semibold mb-5">Resumen del Pago</h2>
      {transactionData ? (
        <>
          <div
            className={`p-4 mb-5 rounded-md border ${transactionData.status === 'APPROVED' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300'}`}
          >
            Tu pago ha sido {transactionData.status.toLowerCase()}.
          </div>
          <table className="w-full table-auto border-collapse mb-5">
            <tbody>
              <tr>
                <td className="px-4 py-2 border"><strong>ID de la Transacción</strong></td>
                <td className="px-4 py-2 border">{transactionData.id}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border"><strong>Cantidad</strong></td>
                <td className="px-4 py-2 border">{formatMoney((transactionData.amount_in_cents / 100).toFixed(2))} COP</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border"><strong>Estado</strong></td>
                <td className="px-4 py-2 border">{transactionData.status}</td>
              </tr>
            </tbody>
          </table>
          <Link to="/shop">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
             Seguir navegando
            </button>
          </Link>
        </>
      ) : (
        <div className="p-4 bg-blue-100 text-blue-800 rounded-md border border-blue-300">
          Buscando el resumen del pago...
        </div>
      )}
    </div>
  );
};

export default PaymentResult;
