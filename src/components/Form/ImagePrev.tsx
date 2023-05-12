import { Button } from "@chakra-ui/react";
import React, { HTMLAttributes, useRef } from "react";
import { BsUpload } from "react-icons/bs";
import { RiDeleteBin2Fill, RiDeleteBinFill } from "react-icons/ri";

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const ImagePrev = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [prevImage, setPrevImage] = React.useState<any>("");

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();

    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files?.[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setPrevImage(readerEvent.target.result);
      }
    };
  };
  return (
    <div>
      <h1 className="text-gray-500 text-sm py-2">{props.label}</h1>
      <div className="w-full border-2 border-dotted border-blue-400 rounded mb-6">
        <input
          type="file"
          name={props.name}
          id={props.label}
          hidden
          ref={inputRef}
          onChange={onImageChange}
        />
        {!prevImage ? (
          <div className="w-full grid place-items-center h-24 border-2 border-dashed border-blue-400 rounded-t">
            <label
              htmlFor={props.label}
              className="cursor-pointer bg-blue-500 rounded-full px-2  py-1 text-white text-sm"
            >
              <Button as="span" rightIcon={<BsUpload strokeWidth={1} />}>
                Upload
              </Button>
            </label>
          </div>
        ) : (
          <>
            <div className="image flex ">
              <img
                src={prevImage}
                alt="banner Image "
                className="block max-h-[400px]"
              />
            </div>
            <div className="button-grp w-full bg-blue-100 border-t-2 px-2  rounded-b py-2">
              <Button
                onClick={() => {
                  inputRef.current!.value = "";
                  setPrevImage(null);
                }}
                className="bg-red-500 text-white text-xs px-2 py-1 rounded-full "
                rightIcon={<RiDeleteBin2Fill />}
              >
                Remove
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImagePrev;
