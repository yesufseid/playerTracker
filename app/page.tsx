
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import HomePage from "./HomePage";


const PlayerTracker = async() => {
  // const supabase = await createClient();
  
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  
  //   if (!user) {
  //     return redirect("/sign-in");
  //   }
  

  return (
    <>
    <HomePage />
    </>
  );
};

export default PlayerTracker;
