/* eslint-disable react/prop-types */
import { Loader } from "../Loader";
import "./Button.css";

export const Button = ({
  isLoading,
  isDisabled = isLoading,
  children,
  className,
  type,
  ...props
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className={`${className} button`}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};
