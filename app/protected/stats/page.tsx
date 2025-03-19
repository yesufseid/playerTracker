import HomeStats from "./HomeStats"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export default async function StatusPage() {
   const supabase = await createClient();
    
      const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/sign-in");}
 
  return (
    <>
    <HomeStats />
    </>
  );
}
