'use client';

import { useState, useEffect } from 'react';
import { Card, Table, TableHead, TableBody, TableRow, TableCell, Tabs, Tab, IconButton } from '@mui/material';
import {Delete,Add } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";

interface Player {
  id:string;
  name: string;
  shoe_number: number;
  start_time: string;
  duration:number
}

type Props = {
  players: Player[];
};

export default function BasicTabs({ players}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [tab, setTab] = useState(0);
  const [localPlayers, setLocalPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setLocalPlayers(players); // Ensure hydration consistency
  }, [players]);

const handleAddTime=(id:string,duration:number)=>{
  dispatch({ type: "players/fechandAddTime",payload:{id:id,duration:duration}}); 
}


  const calculateStatus = (player: Player) => {
    if (typeof window === 'undefined') return 'Pending';

    const now = Date.now();
    const startTime = new Date(player.start_time).getTime();
    const endTime = startTime +player.duration* 60 * 60000; // 1 hour duration

    if (now < startTime) return 'Pending';
    if (now >= startTime && now < endTime) return 'Active';
    return 'Finished';
  };

  const getRemainingTime = (player: Player) => {
    const now = Date.now();
    const startTime = new Date(player.start_time).getTime();
    const endTime = startTime + 60 * 60000;
    const timeLeft = endTime - now;
    const minutes = Math.floor((timeLeft / 60000) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    if (timeLeft > 0) {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${Math.abs(minutes).toString().padStart(2, '0')}:${Math.abs(seconds).toString().padStart(2, '0')} ago`;
    }
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
    <Card className="p-6 w-full max-w-4xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Game Player Tracker</h2>

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
              <TableCell>{calculateStatus(player) === 'Active' ? getRemainingTime(player) : "--"}</TableCell>
              <TableCell>
                <IconButton  onClick={()=>handleAddTime(player.id,player.duration+1)} >
                  <Add color="primary" />
                  {player.duration}
                </IconButton>
                <IconButton >
                  <Delete color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
