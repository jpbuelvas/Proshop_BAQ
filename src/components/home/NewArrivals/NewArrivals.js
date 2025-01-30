import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { useProducts } from "../../services/productsContext";

const NewArrivals = () => {
  const { productos } = useProducts();

  // Cargar productos al montar el componente

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
      <Heading heading="Lo Último en Tendencias" />
      {productos.length > 0 ? (
        <Slider {...settings}>
          {productos.map((item) => (
            <div className="px-2" key={item.id}>
              <Product
              _id={item.id}
              img={item.imagenes || "/no-photo.jpg"}
              productName={item.nombre}
              price={item.precio}
              color={item.color}
              badge={true}
              des={item.descripcion || "Sin descripción disponible."}
              tallas={item.tallas} // Aquí estamos pasando la propiedad 'tallas'
            />
            </div>
          ))}
        </Slider>
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
  
};

export default NewArrivals;
