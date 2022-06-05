import React from "react";
import classNames from "classnames";
import "./button.scss";

type ButtonProps = {
  label: string;
  variant: "success" | "warning" | "error";
  disabled: boolean;
  onClick?: () => void;
};

export const Button = ({ label, variant, onClick, disabled }: ButtonProps) => {
  const buttonClass = classNames({
    button: true,
    button__success: variant === "success",
    button__error: variant === "error",
    button__warning: variant === "warning"
  });
  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      <div className="medium-header">{label}</div>
    </button>
  );
};
