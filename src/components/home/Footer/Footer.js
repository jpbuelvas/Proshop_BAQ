import React, { useState } from "react"; 
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("¡Por favor, ingresa un correo electrónico!");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("¡Por favor, ingresa un correo electrónico válido!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };

  return (
    <div className="w-full bg-[#F5F5F3] py-20 footer-container">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 px-4 gap-10">
        <div className="md:col-span-2 xl:col-span-2">
          <FooterListTitle title="Más sobre ProshopBAQ" />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%]">
              Bienvenido a ProshopBAQ, tu tienda en línea para encontrar productos de calidad. ¡Explora nuestros artículos exclusivos!
            </p>
            <ul className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/proshop_baq/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaInstagram />
                </li>
              </a>
              <a
                href="https://www.facebook.com/proshopBAQ/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaFacebook />
                </li>
              </a>
            </ul>
          </div>
        </div>
        
        
        <div className="md:col-span-1 xl:col-span-1">
          <FooterListTitle title="Tienda" />
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Accesorios
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Ropa
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Nuevas Temporada
            </li>
          </ul>
        </div>
        
       
        <div className="md:col-span-1 xl:col-span-1">
          <div className="w-full">
            <p className="text-center mb-4">
              ¡Recibe las últimas noticias y ofertas exclusivas de ProshopBAQ!
            </p>
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center text-base font-titleFont font-semibold text-green-600"
              >
                ¡Suscripción exitosa!
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder="Ingresa tu correo electrónico...*"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-white text-lightText w-[30%] h-10 hover:bg-black hover:text-white duration-300 text-base tracking-wide"
                >
                  Suscribirse
                </button>
              </div>
            )}
            {/* Imagen de métodos de pago: 
            <Image
              className={`w-[80%] lg:w-[60%] mx-auto ${
                subscription ? "mt-2" : "mt-6"
              }`}
              imgSrc={paymentCard}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
