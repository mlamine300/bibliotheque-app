"use client";
import React, { ReactNode } from "react";
import { HiXMark } from "react-icons/hi2";

const Modal = ({
  children,
  hide,
}: {
  children: ReactNode;
  hide: () => void;
}) => {
  return (
    <div className="absolute flex flex-col -translate-x-1/2 -translate-y-1/2 shad shadow-2xl left-1/2 top-1/2 z-10 bg-white rounded-xl px-8 py-2">
      <div className="ml-auto">
        <HiXMark
          onClick={hide}
          className="text-red w-8 h-8 translate-x-4 hover:w-10 hover:h-10 -translate-y-2"
        />
      </div>
      {children}
    </div>
  );
};

export default Modal;
