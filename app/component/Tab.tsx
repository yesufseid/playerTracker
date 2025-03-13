'use client';

import { useState, useEffect } from 'react';
import { Card, Table, TableHead, TableBody, TableRow, TableCell, Tabs, Tab, IconButton } from '@mui/material';
import {Delete,Add,Done} from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';
import ErrorComp from "./ErrorComp"

interface Player {
  id:string;
  name: string;
  shoe_number: number;
  start_time: string;
  duration:number
  active:boolean
}

type Props = {
  players: Player[];
};

export default function BasicTabs() {
  const dispatch = useDispatch<AppDispatch>();
  const {players,error, loading,Terror} = useSelector((state: RootState) => state.player);
  const [tab, setTab] = useState(0);
  const [localPlayers, setLocalPlayers] = useState<Player[]>([]);
  useEffect(() => {
    dispatch({ type: "players/fetchPlayers"});
  }, [dispatch]);
  useEffect(() => {
    setLocalPlayers(players); // Ensure hydration consistency
  }, [players]);

const handleAddTime=(id:string,duration:number)=>{
  dispatch({ type: "players/fechandAddTime",payload:{id:id,duration:duration}}); 
  Terror ? toast.error('Operation successful!', { autoClose: 3000 }):toast.success('Operation successful!', { autoClose: 3000 });
}
const handleDelete=(id:string)=>{
  dispatch({ type: "players/fechandremove",payload:{id:id}}); 
  Terror ? toast.error('somthing is wrong!', { autoClose: 3000 }):toast.success('Operation successful!', { autoClose: 3000 });
}
const handleStatus=(id:string)=>{
  dispatch({ type: "players/fechandupdateStatus",payload:{id:id}}); 
  Terror ? toast.error('somthing is wrong!', { autoClose: 3000 }):toast.success('Operation successful!', { autoClose: 3000 });
}



const calculateStatus = (player: Player) => {
  if (!player.start_time || player.duration == null) return 'Pending'; // Avoid errors

  const now = new Date().getTime(); // Get current time in UTC
  const startTime = new Date(player.start_time).getTime(); // Convert start_time to UTC

  // If duration is in minutes, use this formula
  const endTime = startTime + player.duration *60* 60000; 

  if (now < startTime) return 'Pending';
  if (now >= startTime && now < endTime) return 'Active';
  return 'Finished';
};


  const getRemainingTime = (player: Player) => {
    const now = Date.now();
    const startTime = new Date(player.start_time).getTime();
    const endTime = startTime + player.duration*60* 60000;
    const timeLeft = endTime - now;
    const minutes = Math.floor(Math.abs(timeLeft) / 60000);
     const seconds = Math.floor((Math.abs(timeLeft) / 1000) % 60);;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalPlayers([...players]);
    }, 1000);
    return () => clearInterval(interval);
  }, [players]);

  const filteredPlayers = localPlayers.filter(player => {
    const status = calculateStatus(player);
    return tab === 0 ? status === 'Active' : tab === 1 ? status === 'Pending' : status === 'Finished';
  });

  return (
    <Card className="w-full md:max-w-4xl shadow-lg">
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered>
        <Tab label="Active" />
        <Tab label="Pending" />
        <Tab label="Finished" />
      </Tabs>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Shoe No.</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPlayers.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.shoe_number}</TableCell>
              <TableCell>{getRemainingTime(player)}</TableCell>
              <TableCell>
                <IconButton  onClick={()=>handleAddTime(player.id,player.duration+1)} >
                  <Add color="primary" />
                  {player.duration}
                </IconButton>
                <IconButton  onClick={()=>handleDelete(player.id)} >
                  <Delete color="error" />
                </IconButton>
                {
                  tab===2 &&
                
                <IconButton  onClick={()=>handleStatus(player.id)} >
                  <Done color="error" />
                </IconButton>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ToastContainer />
      {loading&&<Loading />}
      {error&&<ErrorComp />}
    </Card>
  );
}
