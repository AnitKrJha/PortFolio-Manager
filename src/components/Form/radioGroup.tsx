import { Input } from "@chakra-ui/react";
import React from "react";

type Props = {
  name: string;
  values: string[];
  individualLabels: string[];
  mainLabel: string;
  defaultValue?: string;
};

const RadioGroup = (props: Props) => {
  return (
    <div className="flex flex-col  border-b-2 pb-2 mb-4 border-gray-300">
      <label htmlFor="" className="text-sm font-semibold text-gray-500 mr-4 ">
        {props.mainLabel}
      </label>
      {props.values.map((item: any, index: number) => {
        return (
          <div key={index} className="mt-2">
            <label
              htmlFor={props.individualLabels[index]}
              className="text-sm font-medium text-gray-600 mr-4 ml-3 "
            >
              {props.individualLabels[index]}
            </label>
            <Input
              defaultChecked={item.trim() === props.defaultValue?.trim()}
              name={props.name}
              type="radio"
              id={props.individualLabels[index]}
              value={item}
              className="border-b-2"
              // placeholder="separate-using-comma"
            />
          </div>
        );
      })}
    </div>
  );
};

export default RadioGroup;
