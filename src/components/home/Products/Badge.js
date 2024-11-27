import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
      {text}
    </div>
  );
};

export default Badge;
