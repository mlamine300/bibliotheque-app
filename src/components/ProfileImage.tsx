"use client";
import React from "react";
import { IKImage, ImageKitProvider } from "imagekitio-next";
import config from "../../config";
import { cn } from "@/lib/utils";
function ProfileImage({
  img,
  width,
  height,
  className,
}: {
  img: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
    >
      <IKImage
        alt="profile img"
        path={img}
        width={width || 32}
        height={height || 32}
        className={cn(className, "rounded-full h-8 w-8")}
      />
    </ImageKitProvider>
  );
}

export default ProfileImage;
