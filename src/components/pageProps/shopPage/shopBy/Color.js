import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";

const Color = ({ onColorSelect }) => {
  const [showColors, setShowColors] = useState(true);
  const colors = [
    { _id: 9001, title: "Rojo", base: "#dc2626" },
    { _id: 9002, title: "Azul", base: "#3b82f6" },
    { _id: 9003, title: "Blanco", base: "#ffffff", border: true },
    { _id: 9004, title: "Negro", base: "#000000" },
    { _id: 9005, title: "Amarillo", base: "#facc15" },
    { _id: 9006, title: "Verde", base: "#22c55e" },
    { _id: 9007, title: "Gris", base: "#a3a3a3" },
  ];

  const handleClick = (title) => {
    if (onColorSelect) {
      onColorSelect(title);
    }
  };

  return (
    <div>
      <div onClick={() => setShowColors(!showColors)} className="cursor-pointer">
        <NavTitle title="Comprar por color" icons={true} />
      </div>
      {showColors && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {colors.map((item) => (
              <li
                key={item._id}
                onClick={() => handleClick(item.title)}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <span
                  style={{ background: item.base, border: item.border ? '1px solid #e5e7eb' : 'none' }}
                  className="w-3 h-3 rounded-full"
                ></span>
                {item.title}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Color;
