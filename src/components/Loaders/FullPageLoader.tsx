import { ChakraProvider, Skeleton, Spinner } from "@chakra-ui/react";
import React from "react";

type Props = {};

const FullPageLoader = (props: Props) => {
  return (
    <ChakraProvider>
      <Skeleton
        className="max-w-screen rounded  h-[calc(100vh_-_70px)]  grid place-items-center "
        startColor="orange.600"
        endColor="blue.700"
        fadeDuration={1}
        position={"relative"}
      ></Skeleton>
    </ChakraProvider>
  );
};

export default FullPageLoader;
