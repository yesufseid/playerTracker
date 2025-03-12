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

const GetAll=async()=>{
  const startOfToday = new Date(); 
  startOfToday.setHours(6, 0, 0, 0); // Set time to 6:00 A
const startOfTomorrow = new Date();
startOfTomorrow.setHours(24, 0, 0, 0); // 30 hours = 6 AM next day
  const supabase=await createClient()
   try {
    const { data, error } = await supabase.from('players').select() 
    .eq('active',true)
    .gte('start_time', startOfToday.toISOString()) // From 6 AM today
    .lt('start_time', startOfTomorrow.toISOString());
    if(error){
      console.log(error);
      return {error:true}
    }else{
      console.log(data);
      
      return data
    }
    
   } catch (error) {
    console.log(error);
    return {error:true}
   }
}
const GetStatus = async () => {
  // Get the start of the current week (Monday 6:00 AM)
  const startOfWeek = new Date();
  const dayOfWeek = startOfWeek.getDay();
  const diffToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // If today is Sunday, adjust to Monday (0 = Sunday)
  startOfWeek.setDate(startOfWeek.getDate() - diffToMonday); // Adjust to the previous Monday
  startOfWeek.setHours(6, 0, 0, 0); // Set time to 6:00 AM on Monday

  // Get the end of the current week (next Sunday 6:00 AM)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7); // Next Sunday
  endOfWeek.setHours(6, 0, 0, 0); // Set time to 6:00 AM on Sunday
  
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase.from('players').select()
      .gte('start_time', startOfWeek.toISOString()) // From Monday 6 AM
      .lt('start_time', endOfWeek.toISOString()); // Until next Sunday 6 AM
    
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