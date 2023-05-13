import { ChakraProvider, Skeleton, Spinner } from "@chakra-ui/react";
import React from "react";

type Props = {};

const FullPageLoader = (props: Props) => {
  return (
    <ChakraProvider>
      <div className="max-w-screen rounded  h-[calc(100vh_-_70px)]  grid place-items-center bg-blue-100 ">
        <div className="w-fit text-center">
          <Spinner
            height={"40px"}
            width={"40px"}
            thickness="4px"
            color="blue.400"
          ></Spinner>
          <h1 className="text-center text-md font-semibold animate-bounce">
            Projects Loading..
          </h1>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default FullPageLoader;
