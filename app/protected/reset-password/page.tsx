import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
    <form className="flex flex-col  p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium text-black">Reset password</h1>
      <p className="text-sm text-black  ">
        Please enter your new password below.
      </p>
      <Label htmlFor="password"className="text-black" >New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <Label htmlFor="confirmPassword" className="text-black">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <SubmitButton className="border-2 hover:bg-black hover:text-white" formAction={resetPasswordAction}>
        Reset password
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
    </div>
  );
}
