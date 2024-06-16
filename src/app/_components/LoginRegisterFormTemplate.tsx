"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const LoginRegisterFormTemplate = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full max-w-md space-y-8">
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        {isLogin ? "Sign in to your account" : "Create a new account"}
      </h2>
      <div className="rounded-lg bg-white p-8 shadow dark:bg-gray-900">
        <div className="mb-4 flex justify-center gap-4">
          <Button
            variant={isLogin ? "default" : "outline"}
            onClick={() => setIsLogin(true)}
          >
            Login
          </Button>
          <Button
            variant={!isLogin ? "default" : "outline"}
            onClick={() => setIsLogin(false)}
          >
            Register
          </Button>
        </div>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

//https://v0.dev/r/gl6VD99Wth9
