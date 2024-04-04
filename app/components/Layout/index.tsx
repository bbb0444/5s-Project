import React, { PropsWithChildren } from "react";
import RedSquareRedirect from "@/app/components/About/Info/RedSquareRedirect";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <RedSquareRedirect />
      {children}
    </>
  );
};
export default Layout;
