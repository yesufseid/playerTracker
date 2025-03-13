"use server"
import { createClient } from "@/utils/supabase/server";






const AddPlayer=async( name:string, shoeNumber:number, startTime:Date )=>{
  const supabase=await createClient()
  console.log( name, shoeNumber, startTime);
  try {
    const {error } = await supabase.from('players')
  .insert({name:name,  shoe_number:shoeNumber, start_time:startTime})
  if(error){
    console.log(error);
    return {error:true}
  }else if(error===null){
    return {id:Math.random() ,name:name,shoe_number:shoeNumber, start_time:startTime,duration:1 }
  }
  } catch (error) {
    console.log(error);
    return {error:true}
  }
}



const GetAll = async () => {
  const supabase=await createClient()
  const today = new Date();

  // Convert to UTC (since your local 6:00 AM = 3:00 AM UTC)
  const startOfDay = new Date(today);
  startOfDay.setUTCHours(3, 0, 0, 0);  // 6:00 AM EAT = 3:00 AM UTC
  const startOfDayISO = startOfDay.toISOString();
  
  // End of the "custom day" (5:59 AM the next day in EAT = 2:59 AM UTC)
  const endOfDay = new Date(startOfDay);
  endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);  // Move to next day
  endOfDay.setUTCHours(2, 59, 59, 999);  // 5:59 AM EAT = 2:59 AM UTC
  const endOfDayISO = endOfDay.toISOString();
  try {
   
    const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('active', 'true')  
    .gte('created_at', startOfDayISO)
    .lt('created_at', endOfDayISO);


    if (error) {
      console.error("Supabase Error:", error);
      return { error: true };
    }

    console.log("Fetched Data:", data);
    return data;
  } catch (error) {
    console.error("Try-Catch Error:", error);
    return { error: true };
  }
};

const GetStatus = async () => {
  const supabase = await createClient();
  const today = new Date();

// Convert local 6:00 AM to UTC (3:00 AM UTC)
const startOfToday = new Date(today);
startOfToday.setUTCHours(3, 0, 0, 0); // 6:00 AM EAT = 3:00 AM UTC

// Find the start of the current week based on your 6:00 AM rule
const startOfWeek = new Date(startOfToday);
startOfWeek.setUTCDate(startOfWeek.getUTCDate() - startOfWeek.getUTCDay()); // Set to Sunday
const startOfWeekISO = startOfWeek.toISOString();

// Get current time (UTC) as the end range
const nowISO = new Date().toISOString();
  
  try {
    const { data, error } = await supabase
  .from('players')
  .select('*')
  .gte('created_at', startOfWeekISO)
  .lt('created_at', nowISO);
    
    if (error) {
      console.log(error);
      return { error: true };
    } else {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}

const UpdateStatus=async(id:string)=>{
  const supabase=await createClient()
  try {
    const {error } = await supabase.from('players').update({ active:false})
    .eq('id',id)
  if(error){
    console.log(error);
    return {error:true}
  }else if(error===null){
    return {id:id}
  }
  } catch (error) {
    console.log(error);
    return {error:true}
  }      
}
const AddTime=async(id:string,duration:number)=>{
  const supabase=await createClient()
  try {
    const {error } = await supabase.from('players').update({ duration:duration})
    .eq('id',id)
  if(error){
    console.log(error);
    return {error:true}
  }else if(error===null){
    return {id:id,duration:duration}
  }
  } catch (error) {
    console.log(error);
    return {error:true}
  }  
}
const deletePlayer=async(id:string)=>{
  const supabase=await createClient()
  try {
    const {error} = await supabase
    .from('players')
    .delete()
    .eq('id',id)
  if(error){
    console.log(error);
    return {error:true}
  }else if(error===null){
    return {id:id}
  }
  } catch (error) {
    console.log(error);
    return {error:true}
  }  
}

export {GetAll,AddPlayer,UpdateStatus,AddTime,deletePlayer,GetStatus}