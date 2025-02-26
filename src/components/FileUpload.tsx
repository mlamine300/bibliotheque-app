/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from "../../config";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

import { cn } from "@/lib/utils";

const MB = 1024 * 1024;
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

interface Props {
  type: "video" | "image";
  variant: "light" | "dark";
  placeHolder: string;
  folder: string;
  defaultFilePath?: string;
  onFileChange: (filePath: string) => void;
}

function FileUpload({
  onFileChange,
  type,
  variant,
  placeHolder,
  folder,
  defaultFilePath,
}: Props) {
  const { toast } = useToast();
  const IKref = useRef(null);

  const [file, setFile] = useState<{ filePath: string } | null>(
    defaultFilePath ? { filePath: defaultFilePath } : null
  );

  const [progress, setProgress] = useState(0);
  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeHolder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const accept = type === "image" ? "image/*" : "video/*";
  const onError = (err: any) => {
    console.log(err);
    toast({
      title: `error on uploading the ${type}`,
      description: `impossible to upload ${type} !:${err.message}`,
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: `${type} uploaded successfully!`,
      description: `${res.filePath()} uploaded successfully!`,
    });
  };

  const onValidate = (file: File) => {
    const maxSize = type === "image" ? 20 : 50;

    if (file.size > maxSize * MB) {
      toast({
        title: `${type} size too large`,
        description: `Please upload a file that is less than ${maxSize}MB`,
        variant: "destructive",
      });
      return false;
    }
    return true;
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
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />
      <button
        className={cn("upload-btn", styles.button)}
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
        <p className={cn("text-base", styles.placeHolder)}>{placeHolder}</p>
        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath} </p>
        )}
      </button>
      {progress > 0 && progress < 100 ? (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      ) : (
        ""
      )}
      {file ? (
        type === "image" ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) : (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        )
      ) : (
        ""
      )}
    </ImageKitProvider>
  );
}

export default FileUpload;
