import { Textarea } from "@chakra-ui/react";
import React, { SetStateAction } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  onInputChange?: (a: any) => any;
}

const FloatingInput = (props: Props) => {
  const { label, name, type, required, onInputChange, ...otherProps } = props;

  return (
    <div className=" font-poppins relative z-0 w-full mb-6 group">
      {type === "textarea" ? (
        <Textarea
          name={name}
          id={name}
          defaultValue={otherProps.defaultValue}
          rows={4}
          className=" font-poppins block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark-text-white dark-border-gray-500 dark-focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          className=" font-poppins block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark-text-white dark-border-gray-500 dark-focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required={required}
          {...otherProps}
        />
      )}
      <label
        htmlFor={name}
        className="font-semibold font-poppins peer-focus:font-medium absolute text-sm text-gray-500 dark-text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark-text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
