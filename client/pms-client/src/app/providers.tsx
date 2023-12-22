"use client";

import { NextUIProvider } from "@nextui-org/react";
import ReduxProvider from "../redux/ReduxProvider";
import { store } from "../redux/store";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const { accessToken } = store.getState().authReducer;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!accessToken) router.push("/login");
  }, [accessToken]);

  useEffect(() => {
    router.push(`${pathname}?token=${accessToken}`);
  }, [pathname]);

  return (
    <NextUIProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </NextUIProvider>
  );
}
