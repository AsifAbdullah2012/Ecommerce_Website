import React from "react";

const HeroBanner = () => {
  return (
    <div className="bg-orange-500 p-8 flex items-center justify-between ">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Vom Feld auf den Teller in 7 Stunden
        </h1>
        <p className="text-white text-lg">Knuspr - Frisch geliefert!</p>
      </div>
    </div>
  );
};

export default HeroBanner;
