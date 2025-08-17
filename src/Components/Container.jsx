import React from "react";
import { Cn } from "./Ui/Cn";

const Container = ({ children, className }) => {
  return (
    <div className={Cn("max-w-screen-xl mx-auto px-5 ", className)}>
      {children}
    </div>
  );
};

export default Container;
