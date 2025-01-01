"use client";
import { loginSignup } from "@/actions/user";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import React, { useOptimistic } from "react";

const Signup = () => {
  const [loading, setLoading] = useOptimistic(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const res = await loginSignup(formData, false);
    if (res?.error) {
      toast({ title: res?.error });
    }
    setLoading(false);
  };
  return (
    <div className=" min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-center font-bold text-2xl mb-6">Sign Up</h1>
        <form action={handleSubmit} className="w-full px-5">
          <FormInput
            name="name"
            type="text"
            placeholder="Enter your name"
            label="Full Name"
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Enter the email"
            label="Email"
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Enter the password"
            label="Enter Password"
          />
          <Button
            type="submit"
            className={`${
              loading && "disabled cursor-not-allowed"
            } w-full bg-green-500`}
          >
            {loading ? "loading..." : "Register"}
          </Button>
        </form>
        <div className="flex justify-center gap-2 mt-3 ">
          <h1 className="">
          Already have and account? 
          </h1>
          <Link
            href="/login"
            className="text-center cursor-pointer "
          >
            <span className="text-green-500 font-bold">
              Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
