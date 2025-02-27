import Image from "next/image";
import React from "react";
import { useFormStatus } from "react-dom";

const CheckBeforeAction = ({
  type,
  action,
}: {
  type: "reject" | "approve";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (s: any) => void;
}) => {
  return (
    <form
      action={action}
      className="bg-white gap-4 w-[500px] h-[338] font-ibm-plex-sans flex flex-col items-center"
    >
      <Image
        src={
          type === "approve"
            ? "/icons/admin/approve.svg"
            : "/icons/admin/deny.svg"
        }
        alt={`${type} icon`}
        width={110}
        height={110}
        className="w-28 h-28 rounded-full"
      />
      <h3 className="font-semibold text-xl text-dark-500">
        {type === "approve" ? "Approve Book Request" : "Deny Account Request"}
      </h3>
      <p className="text-base font-normal text-light-500">
        {type === "approve"
          ? "Approve the student’s account request and grant access. A confirmation email will be sent upon approval."
          : "Denying this request will notify the student they’re not eligible due to unsuccessful ID card verification."}{" "}
      </p>
      <HandleButton type={type} />
    </form>
  );
};
const HandleButton = ({
  type,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  type: "approve" | "reject";
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`text-base font-bold text-light-300 rounded-lg w-full py-2 ${
        pending ? "bg-gray-500" : type === "approve" ? "bg-green-900" : "bg-red"
      } disabled:cursor-not-allowed`}
    >
      {pending
        ? "Updating...."
        : type === "approve"
        ? "Approve & Send Confirmation"
        : "Deny & Notify Student"}
    </button>
  );
};

export default CheckBeforeAction;
