"use client";

import React, { useState } from "react";
import { logOut } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";
import { BiLogOut } from "react-icons/bi";
function LogOutButtont({ className }: { className?: string }) {
  const [pending, setPending] = useState<boolean>(false);
  const handleLogOut = async () => {
    setPending(true);
    await logOut();
    setPending(false);
  };
  return (
    <button
      disabled={pending}
      className={cn(
        className,
        "disabled:cursor-not-allowed disabled:bg-primary/60"
      )}
      onClick={handleLogOut}
    >
      <BiLogOut className="w-6 h-6 text-red" />
    </button>
  );
}

export default LogOutButtont;
