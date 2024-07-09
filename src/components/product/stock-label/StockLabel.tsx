"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}
export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <h1
          className={` ${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse `}
        >
          &nbsp;
        </h1>
      ) : (
        <div>
          {/* <span
            className={`${
              slug ? "bg-green-500" : "bg-red-500"
            } text-white px-2 py-1 rounded-full antialiased `}
          >
            {stock > 0 ? ` Disponible` : "Agotado"}
          </span> */}
          <h1
            className={` ${titleFont.className} antialiased font-bold text-lg`}
          >
            Stock: {stock}
          </h1>
        </div>
      )}
    </>
  );
};