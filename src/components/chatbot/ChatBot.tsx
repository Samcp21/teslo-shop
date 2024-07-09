"use client";
import clsx from "clsx";
import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { Dialog } from "./Dialog";

export const ChatBot = () => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={toggleModal}
          className="text-5xl rounded-full bg-white p-2 text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Chat con nuestro bot"
        >
          <FaRobot />
        </button>
      </div>
      <div
        className={` fixed max-sm:inset-0 bg-white p-4 rounded-lg shadow-lg sm:absolute sm:right-0  sm:mr-2 sm:mb-12 sm:w-8/12 sm:-translate-x-20 sm:-translate-y-52 sm:rounded-lg transition-opacity duration-300 ease-out ${
          openModal
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {openModal && (
          // (
          //   <div className="flex flex-col items-start h-full">
          //     <h2 className="text-xl font-bold">ChatBot</h2>
          //     <p>¡Hola! ¿Cómo puedo ayudarte?</p>
          //     <div className="mt-auto">
          //       <button
          //         onClick={toggleModal}
          //         className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 w-full"
          //       >
          //         Cerrar
          //       </button>
          //     </div>
          //   </div>
          // )
          <Dialog />
        )}
      </div>
    </div>
  );
};
