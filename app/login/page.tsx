import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <main className="bg-[#1A1A1A] h-screen">
      <header className="w-full px-4">
        <div className="mx-auto max-w-360 flex items-center justify-between py-1">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Airport Assist"
              width={168.1}
              height={70.5}
              className="h-auto"
            />
          </Link>
        </div>
      </header>
      <form className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  max-w-95 text-white flex flex-col gap-4">
        <h1 className="text-center text-2xl">Login</h1>
        <div>
          <Label className="mb-1 font-normal">Email address</Label>
          <Input
            type="email"
            className="h-11.25 rounded-xl bg-white"
            placeholder="Email address"
          />
        </div>
        <div>
          <div>
            <Label className="mb-1 font-normal">Password</Label>
            <Input
              type="password"
              className="h-11.25 rounded-xl bg-white"
              placeholder="Password"
            />
          </div>

          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="show password"
                className="cursor-pointer rounded-full bg-white data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:border-white"
              />
              <Label htmlFor="show password" className="font-normal">
                Show Password
              </Label>
            </div>
            <Link href={"/"}>Forget Password?</Link>
          </div>
        </div>
        <div>
          <Button asChild variant={"outline"} className="text-black w-full">
            <Link href={"/profile"}>LOG IN</Link>
          </Button>
        </div>
        <div className="mt-6">
          <p className="text-center">
            if you don't have an account yet <Link className="font-semibold underline" href={'/register'}>create one</Link>
          </p>
        </div>
        <div className="mt-6">
          <Link href={"/"} className="flex gap-2 items-center justify-center">
            Back to website <ArrowRight />
          </Link>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
