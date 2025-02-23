import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return <section className="  rounded-lg m-8">{children}</section>;
}

export default layout;
