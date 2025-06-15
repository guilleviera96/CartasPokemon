import React, { createContext, useState, useEffect, useContext } from "react";

const CartasContext = createContext();

export const CartasProvider = ({ children }) => {
  const [cartas, setCartas] = useState([]);

  // Al cargar, leo cartas de localStorage
  useEffect(() => {
    const cartasGuardadas = JSON.parse(localStorage.getItem("cartasPoseidas") || "[]");
    setCartas(cartasGuardadas);
  }, []);

  // Función para eliminar cartas (opcional)
  const eliminarCarta = (id) => {
    setCartas((prev) => {
      const filtradas = prev.filter((c) => c.id !== id);
      localStorage.setItem("cartasPoseidas", JSON.stringify(filtradas));
      return filtradas;
    });
  };

  return (
    <CartasContext.Provider value={{ cartas, setCartas, eliminarCarta }}>
      {children}
    </CartasContext.Provider>
  );
};

// Hook personalizado para consumir el contexto fácilmente
export const useCartas = () => {
  return useContext(CartasContext);
};
