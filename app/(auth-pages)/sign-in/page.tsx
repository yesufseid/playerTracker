import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
    <form className="flex-1 flex flex-col max-w-96  max-h-96">
      <h1 className="text-2xl font-medium text-black">Sign in</h1>
      <p className="text-sm  text-black">
        forgot-password?{" "}
        <Link className=" font-medium underline" href="/forgot-password">
           reset
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email" className="text-black">Email</Label>
        <Input 
              name="email" 
           placeholder="you@example.com" 
              required
                  />
        <div className="flex justify-between items-center">
          <Label htmlFor="password" className="text-black">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
      
        />
        <SubmitButton className="border-2 hover:bg-black hover:text-white" pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
    </div>
  );
}
