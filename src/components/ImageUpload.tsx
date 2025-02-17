/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "../../config";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const authenticator = async () => {
  try {
    const resp = await fetch(`${config.env.apiEndPoint}/api/imagekit`);
    if (!resp.ok) {
      const err = await resp.text();
      throw new Error(`Request failed with status ${resp.status} : ${err}`);
    }
    const data = await resp.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed : ${error.message}`);
  }
};
function ImageUpload({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) {
  const { toast } = useToast();
  const IKref = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (err: any) => {
    console.log(err);
    toast({
      title: "error on uploading file",
      description: `impossible to upload file !:${err.message}`,
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
  };
  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={IKref}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          //@ts-ignore
          if (IKref.current) IKref.current?.click();
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a File</p>
        {file && <p className="upload-filename">{file.filePath} </p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
}

export default ImageUpload;
