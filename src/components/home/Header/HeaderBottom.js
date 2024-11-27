import React, { useState, useRef, useEffect } from "react";
import { FaSearch,  FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchProducts } from "../../services/utils";

const HeaderBottom = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  // Este efecto se asegura de que al hacer clic fuera del menú, este se cierre.
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [ref]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productos, setProductos] = useState([]);

  // Cargar productos desde la API cuando el componente se monte.
  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts(); // Llamada a la función desde utils.js.
      setProductos(products);
    };

    loadProducts();
  }, []);

  // Filtrar productos basados en la búsqueda del usuario.
  useEffect(() => {
    const filtered = productos.filter((item) =>
      item.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filtered, "Productos filtrados");
    setFilteredProducts(filtered);
  }, [searchQuery, productos]); 
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-end w-full px-4 pb-4 lg:pb-0 h-full lg:h-24 gap-4">
          {/* Menú lateral de categorías */}
          {/* <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Comprar por categoría</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
              >
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Accesorios
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Muebles
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Electrónicos
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Ropa
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Bolsos
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Electrodomésticos
                </li>
              </motion.ul>
            )}
          </div> */}

          {/* Barra de búsqueda */}
          <div className="relative w-full lg:w-[400px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Busca tus productos aquí"
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer gap-4`}>
                {searchQuery &&
                  filteredProducts.map((item) => (
                    <div
                      onClick={() =>
                        navigate(
                          `/product/${item.nombre.toLowerCase().split(" ").join("")}`,
                          { state: {
                            item: {
                              _id: item.id,
                              img: item.imagenes?.[0] || '/no-photo.jpg',
                              productName: item.nombre,
                              price: item.precio,
                              color: item.color,
                              badge: true,
                              des: item.descripcion || 'Sin descripción disponible.'
                            } }}
                        ) & setSearchQuery("")
                      }
                      key={item.id}
                      className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3 p-2"
                    >
                      <img className="w-24" src={item.imagenes?.[0] || '/no-photo.jpg'} alt="productImg" />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-lg">{item.nombre}</p>
                        <p className="text-xs">{item.descripcion}</p>
                        <p className="text-sm">
                          Precio: <span className="text-primeColor font-semibold">${item.precio}</span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Iconos de usuario y carrito */}
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            {/* <div onClick={() => setShowUser(!showUser)} className="flex">
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >
                <Link to="/signin">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Iniciar sesión
                  </li>
                </Link>
                <Link onClick={() => setShowUser(false)} to="/signup">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Registrarse
                  </li>
                </Link>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Perfil
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Otros
                </li>
              </motion.ul>
            )} */}
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
