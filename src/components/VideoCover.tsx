"use client";
import { IKVideo } from "imagekitio-next";
import React from "react";
import config from "../../config";
import { cn } from "@/lib/utils";

function VideoCover({ path, className }: { path: string; className?: string }) {
  return (
    <div className="w-full">
      <h1 className="text-3xl text-light-100 font-semibold font-ibm-plex-sans">
        Video
      </h1>
      <IKVideo
        urlEndpoint={config.env.imagekit.urlEndpoint}
        path={path}
        controls={true}
        className={cn("mx-4 w-full rounded-lg mt-8 ", className)}
      />
    </div>
  );
}

export default VideoCover;
