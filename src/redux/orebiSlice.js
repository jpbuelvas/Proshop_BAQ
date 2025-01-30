import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // Importar toast

const initialState = {
  userInfo: [],
  products: [],
  address:{},
};

export const orebiSlice = createSlice({
  name: "proshop",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item.name === action.payload.name
      );
      if (item) {
        toast.info(`El producto ${action.payload.name} ya está en el carrito.`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#ffff",
            color: "#2196F3",
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
          },
        });
      } else {
        try {
          state.products.push(action.payload);
          toast.success(`${action.payload.name} ha sido agregado al carrito!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              backgroundColor: "#ffff",
              color: "#4CAF50",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
            },
          });
        } catch (error) {
          toast.error(`No se pudo agregar ${action.payload.name} al carrito.`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              backgroundColor: "#ffff",
              color: "#f44336",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
            },
          });
        }
      }
    }
    ,
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    setCartDetails: (state, action) => {
      // El payload completo es la dirección, no necesita .address
      state.address = action.payload;
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  setCartDetails,
  resetCart,
} = orebiSlice.actions;
export default orebiSlice.reducer;
