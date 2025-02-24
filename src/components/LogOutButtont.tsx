import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { logOut } from "@/lib/actions/auth";

function LogOutButtont({ className }: { className?: string }) {
  return (
    <Button
      className={className}
      onClick={async () => {
        await logOut();
      }}
    >
      <Image src="/icons/logout.svg" alt="logout" width={30} height={30} />
    </Button>
  );
}

export default LogOutButtont;
