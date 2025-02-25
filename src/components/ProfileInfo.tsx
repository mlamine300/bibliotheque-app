"use client";
import { IKImage } from "imagekitio-next";
import { MdVerified } from "react-icons/md";
import React from "react";
import { userInfo } from "..";
import Image from "next/image";

function ProfileInfo({
  user,
  urlEndpoint,
}: {
  user: userInfo;
  urlEndpoint: string;
}) {
  return (
    <div className="relative px-16 py-10 bg-dark-300 w-full flex flex-col  rounded-3xl">
      <Image
        src="/icons/Frame 165.svg"
        alt=""
        width={59}
        height={88}
        className="absolute -top-8 left-[50%] -translate-x-[30px] w-[59px] h-[88px]"
      />

      <div className="flex gap-4 mt-20 ">
        <IKImage
          urlEndpoint={urlEndpoint}
          alt="user"
          width={120}
          height={120}
          className="border-8 border-dark-500/30 border-solid rounded-full w-[120px] h-[120px]"
          path={user.userAvatar}
        />
        <div className="ml-6 flex flex-col justify-around font-ibm-plex-sans">
          <h3 className="text-base font-light text-light-100">
            {user.status === "APPROVED" ? (
              <div className="flex gap-2 items-center">
                <MdVerified className="text-primary" />
                Verified Student
              </div>
            ) : (
              "Not Verified "
            )}{" "}
          </h3>
          <h3 className="font-semibold text-2xl text-light-400">
            {user.name}{" "}
          </h3>
          <h3 className="text-lg font-light text-light-100">{user.email} </h3>
        </div>
      </div>
      <div className="ml-8 flex flex-col mt-8 ">
        <h3 className="text-lg font-light text-light-100">University</h3>
        <h3 className=" text-2xl font-semibold text-light-400">
          {user.email.split("@")[1].split(".")[0]}{" "}
        </h3>
      </div>

      <div className="ml-8 mb-16 flex flex-col mt-8 text-light-100">
        <h3 className="text-lg font-normal text-light-100">Student ID</h3>
        <h3 className=" text-2xl font-semibold text-light-400">
          {user.studentId}{" "}
        </h3>
      </div>
      <div className="flex justify-center w-full">
        <IKImage
          urlEndpoint={urlEndpoint}
          width={486}
          height={287}
          alt="user"
          className="h-[287px] rounded-lg w-[486px] "
          path={user.universityCard}
        />
      </div>
    </div>
  );
}

export default ProfileInfo;
