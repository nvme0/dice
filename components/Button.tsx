import { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  disabled?: boolean;
}

export default function Button({ onClick, children, disabled }: ButtonProps) {
  return (
    <button
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  disabled:bg-slate-400 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
