"use client";
import React from "react";
import { IKImage, ImageKitProvider } from "imagekitio-next";
import config from "../../config";
function ProfileImage({ img }: { img: string }) {
  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
    >
      <IKImage
        alt="profile img"
        src={img}
        width={32}
        height={32}
        className="rounded-full h-8 w-8 "
      />
    </ImageKitProvider>
  );
}

export default ProfileImage;
