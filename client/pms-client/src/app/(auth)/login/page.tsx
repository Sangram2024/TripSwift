import React from "react";
import LoginForm from "./login-form";

type Props = {};

export default function Login({}: Props) {
  return (
    <section className="flex items-center justify-between">
      <div className="bg-[url('/assets/login-bg.jpg')] repeat-0 bg-cover h-screen w-1/2" />
      <div className="h-screen w-1/2 grid place-content-center">
        <LoginForm />
      </div>
    </section>
  );
}
