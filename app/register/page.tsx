"use client";

import { OptionType } from "@/components/custom inputs/search";
import SelectDropdown from "@/components/custom inputs/SelectList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ACCOUNT_TYPE_OPTIONS: OptionType[] = [
  { value: "individual", label: "Individual" },
  { value: "organisation", label: "Organisation" },
];

const RegisterPage = () => {
  const [accountType, setAccountType] = useState<OptionType | null>({
    value: "individual",
    label: "Individual",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="bg-[#1A1A1A] min-h-screen flex flex-col">
      <header className="w-full px-4 shrink-0">
        <div className="mx-auto max-w-360 flex items-center justify-between py-1">
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

      <div className="flex-1 overflow-y-auto py-8 px-4">
        <form className="mx-auto max-w-120 text-white flex flex-col gap-4">
          <h1 className="text-center text-2xl">Registration</h1>
          <p>Please complete all of the fields in the form below</p>

          <div>
            <Label className="mb-1 font-normal">Title</Label>
            <Input
              className="h-11.25 rounded-xl bg-white text-black"
              placeholder="Title"
            />
          </div>

          <div className="flex gap-3  flex-col xs:flex-row">
            <div className="flex-1">
              <Label className="mb-1 font-normal">First Name</Label>
              <Input
                className="h-11.25 rounded-xl bg-white text-black"
                placeholder="First name"
              />
            </div>
            <div className="flex-1">
              <Label className="mb-1 font-normal">Last Name</Label>
              <Input
                className="h-11.25 rounded-xl bg-white text-black"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <Label className="mb-1 font-normal">Email</Label>
            <Input
              type="email"
              className="h-11.25 rounded-xl bg-white text-black"
              placeholder="Email address"
            />
          </div>

          <div>
            <Label className="mb-1 font-normal">Phone</Label>
            <Input
              type="tel"
              className="h-11.25 rounded-xl bg-white text-black"
              placeholder="Phone number"
            />
          </div>

          <div>
            <Label className="mb-1 font-normal">Account Type</Label>
            <SelectDropdown
              id="accountType"
              placeholder="Select account type"
              className="text-black"
              inputClassName="h-11.25 rounded-xl bg-white text-black border-[#E0E0E0]"
              options={ACCOUNT_TYPE_OPTIONS}
              value={accountType}
              onSelect={(option) => setAccountType(option)}
            />
          </div>

          {accountType?.value === "organisation" && (
            <>
              <div>
                <Label className="mb-1 font-normal">Organisation Name</Label>
                <Input
                  className="h-11.25 rounded-xl bg-white text-black"
                  placeholder="Organisation name"
                />
              </div>
              <div>
                <Label className="mb-1 font-normal">
                  Company Registration Number
                </Label>
                <Input
                  className="h-11.25 rounded-xl bg-white text-black"
                  placeholder="Company registration number"
                />
              </div>
            </>
          )}

          <div className="flex flex-col gap-2">
            <Label className="mb-1 font-normal">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              className="h-11.25 rounded-xl bg-white text-black"
              placeholder="Password"
            />
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="show-password"
                  checked={showPassword}
                  onCheckedChange={(val) => setShowPassword(!!val)}
                  className="cursor-pointer rounded-full bg-white data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:border-white"
                />
                <Label htmlFor="show-password" className="font-normal">
                  Show Password
                </Label>
              </div>
              <Link href="/">Forget Password?</Link>
            </div>
          </div>

          <Button variant="outline" className="text-black w-full">
            REGISTER
          </Button>

          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </p>

          <Link
            href="/"
            className="flex gap-2 items-center justify-center mt-2 mb-4"
          >
            Back to website <ArrowRight />
          </Link>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
