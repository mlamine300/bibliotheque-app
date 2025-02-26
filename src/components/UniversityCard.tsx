"use client";
import { IKImage } from "imagekitio-next";
import React from "react";

const UniversityCard = ({
  urlEndpoint,
  path,
}: {
  urlEndpoint: string;
  path: string;
}) => {
  return (
    <IKImage
      urlEndpoint={urlEndpoint}
      width={486}
      height={287}
      alt="user"
      className="h-[287px] rounded-lg w-[486px] "
      path={path}
    />
  );
};

export default UniversityCard;
