import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
import { MdVerified } from "react-icons/md";


const BannerBottom = () => {
  return (
    <div className="w-full bg-white border-b-[1px] py-4 border-b-gray-200 px-4">
      <div className="max-w-container mx-auto h-20 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 w-72 shadow-sm hover:shadow-md duration-300">
          <span className="font-bold font-titleFont w-6 text-center">
          <MdVerified />

          </span>

          <p className="text-lightText text-base">Calidad Garantizada</p>
        </div>
        <div className="flex md:w-auto items-center gap-2 w-72 shadow-sm hover:shadow-md duration-300">
          <span className="text-xl text-center w-6 ml-1">
            <MdLocalShipping />
          </span>
          <p className="text-lightText text-base">Envios a todo el pais</p>
        </div>
        <div className="flex md:w-auto items-center gap-2 w-72 shadow-sm hover:shadow-md duration-300">
          <span className="text-2xl text-center w-6">
          <MdSupportAgent />
          </span>
          <p className="text-lightText text-base">Soporte Personalizado</p>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;
