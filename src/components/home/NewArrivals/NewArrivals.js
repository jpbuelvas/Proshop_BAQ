import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { useDispatch } from "react-redux";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { fetchProducts } from "../../services/utils";
const NewArrivals = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar productos al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const products = await fetchProducts(); // Llamada a la función que obtiene productos
      setProductos(products);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-16">
      <Heading heading="Nuevas Llegadas" />
      <Slider {...settings}>
        {loading ? (
          <div>Cargando productos...</div>
        ) : (
          productos.map((item) => (
            <div className="px-2" key={item.id}>
              <Product
                _id={item.id}
                img={item.imagenes?.[0] || '/no-photo.jpg'} // Usa una imagen por defecto si no existe
                productName={item.nombre}
                price={item.precio}
                color={item.color}
                badge={true}
                des={item.descripcion || 'Sin descripción disponible.'}
              />
            </div>
          ))
        )}
      </Slider>
    </div>
  );
};

export default NewArrivals;
