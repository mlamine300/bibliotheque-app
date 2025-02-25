"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { logOut } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

function LogOutButtont({ className }: { className?: string }) {
  const [pending, setPending] = useState<boolean>(false);
  const handleLogOut = async () => {
    setPending(true);
    await logOut();
    setPending(false);
  };
  return (
    <Button
      disabled={pending}
      className={cn(
        className,
        "disabled:cursor-not-allowed disabled:bg-primary/60"
      )}
      onClick={handleLogOut}
    >
      <Image src="/icons/logout.svg" alt="logout" width={30} height={30} />
    </Button>
  );
}

export default LogOutButtont;
