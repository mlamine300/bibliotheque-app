"use client";
import { cn } from "@/lib/utils";
import { IKVideo } from "imagekitio-next";
import React from "react";

interface VideoProps {
  urlEndpoint: string;
  videoUrl: string;
  className: string;
}
const Video = ({ urlEndpoint, videoUrl, className }: VideoProps) => {
  return (
    <IKVideo
      controls={true}
      urlEndpoint={urlEndpoint}
      path={videoUrl}
      height={100}
      width={100}
      className={cn("rounded-2xl", className)}
    />
  );
};

export default Video;
