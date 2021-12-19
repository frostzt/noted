import React from "react";
import cx from "classnames";

interface ButtonProps {
  className?: string;
  handler?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, handler, className }) => {
  return (
    <div
      onClick={handler}
      className={cx([
        "text-slate-50 w-fit h-fit py-2 px-3 bg-blue-500 shadow-lg shadow-blue-500/50 rounded cursor-pointer",
        className || null,
      ])}
    >
      {children}
    </div>
  );
};

export default Button;
