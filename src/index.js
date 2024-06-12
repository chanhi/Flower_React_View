import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from '@chakra-ui/react'
//tanstack 라이브러리를 사용하기 위한 클라이언트 객체 생성
const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
//라우터 및 react-query 사용하겠다고 선언
root.render(
  <QueryClientProvider client={client}>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </QueryClientProvider>
);

