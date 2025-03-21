import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-medium text-black">Reset Password</h1>
          <p className="text-sm text-black">
            Already have an account?{" "}
            <Link className=" underline text-black" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email" className="text-black">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton formAction={forgotPasswordAction}  className="border-2  hover:bg-black hover:text-white" >
            Reset Password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
        <small className="text-sm text-black">
          <strong> Note:</strong> please ckeck your email!
        </small>
      </form>
    </>
  );
}
