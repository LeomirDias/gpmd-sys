import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import LoginForm from "./authentication/_components/login-form ";
import Image from "next/image";


const AuthenticationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center mt-20 absolute top-0 left-1/2 -translate-x-1/2">
        <Image src="/logo-gpmd.png" alt="GMPD" width={200} height={200} />
      </div>
      <div className="w-full max-w-lg ">
        <LoginForm />
      </div>
    </div>
  );
};

export default AuthenticationPage;
