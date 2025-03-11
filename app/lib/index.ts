"use server"
import { createClient } from "@/utils/supabase/server";
import { duration } from "@mui/material";




const AddPlayer=async( name:string, shoeNumber:number, startTime:Date )=>{
  const supabase=await createClient()
  console.log( name, shoeNumber, startTime);
  try {
    const {data, error } = await supabase.from('players')
  .insert({name:name,  shoe_number:shoeNumber, start_time:startTime})
  if(error){
    console.log(error);
    return {error:true}
  }else{
    console.log(data);
    return {id:77976 ,name:name,  shoe_number:shoeNumber, start_time:startTime }
  }
  } catch (error) {
    console.log(error);
    return {error:true}
  }
}

const GetAll=async()=>{
  const supabase=await createClient()
   try {
    const { data, error } = await supabase.from('players').select()
    if(error){
      console.log(error);
      return {error:true}
    }else{
      return data
    }
    
   } catch (error) {
    console.log(error);
    return {error:true}
   }
}
const UpdateStatus=async(id:string)=>{
        
}
const AddTime=async(id:string,duration:number)=>{
  const supabase=await createClient()
  try {
    const {error } = await supabase.from('players').update({ duration:duration})
    .eq('id',id)
  if(error){
    console.log(error);
    return {error:true}
  }else{
    return {id:id,duration:duration}
  }
  } catch (error) {
    console.log(error);
    return {error:true}
  }  
}
const deletePlayer=async(id:string)=>{
  
}

export {GetAll,AddPlayer,UpdateStatus,AddTime,deletePlayer}