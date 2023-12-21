"use client";

import { NextUIProvider } from "@nextui-org/react";
import ReduxProvider from "@/Redux/ReduxProvider";
import { store } from "@/Redux/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const { accessToken } = store.getState().authReducer;
  const router = useRouter();

  //   useEffect(() => {
  //     if (!accessToken) router.push("/login");
  //   }, [accessToken]);

  return (
    <NextUIProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </NextUIProvider>
  );
}
