import React, { FC } from "react";
import { GoBackProps } from "../types";
import { Link } from "react-router-dom";

const GoBack: FC<GoBackProps> = ({ to, className }) => {
  const defaultClasses: string[] = ["btn", "btn-light", "mb-4"];

  const combineClasses = (defaultClasses: string[], className?: string) => {
    const customClasses: string[] = className ? className.split(" ") : [];
    return [...new Set([...defaultClasses, ...customClasses])].join(" ");
  };

  return (
    <Link to={to} className={combineClasses(defaultClasses, className)}>
      Go Back
    </Link>
  );
};

export default GoBack;
