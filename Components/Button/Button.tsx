import React from 'react';
import cx from 'classnames';

interface ButtonProps {
  div?: boolean;
  className?: string;
  handler?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, handler, className, div }) => {
  if (div) {
    return (
      <div
        onClick={handler}
        className={cx([
          'text-slate-50 w-fit h-fit py-2 px-3 bg-blue-500 shadow-lg shadow-blue-500/50 rounded cursor-pointer text-center',
          className || null,
        ])}
      >
        {children}
      </div>
    );
  }
  return (
    <button
      onClick={handler}
      className={cx([
        'text-slate-50 w-fit h-fit py-2 px-3 bg-blue-500 shadow-lg shadow-blue-500/50 rounded cursor-pointer',
        className || null,
      ])}
    >
      {children}
    </button>
  );
};

export default Button;
