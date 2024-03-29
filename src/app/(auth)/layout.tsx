import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-svh items-center justify-center">{children}</main>
  );
};

export default AuthLayout;
