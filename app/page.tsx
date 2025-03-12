'use client';

import { useState, useEffect } from 'react';
import { Add } from '@mui/icons-material';
import BasicTabs from './component/Tab';
import AddPlayerDialog from './component/Dialog';
import {  Button} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/Redux/store";


const PlayerTracker = () => {
  const [open, setOpen] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ name: "", shoeNumber: "" });
  const dispatch = useDispatch<AppDispatch>();
  const { players, error, loading, } = useSelector((state: RootState) => state.player);
 
 
  useEffect(() => {
    dispatch({ type: "players/fetchPlayers"});
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
     <BasicTabs />
      
      <Button
        variant="contained"
        color="primary"
        className="fixed bottom-6 right-6"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        Add Player
      </Button>
      <AddPlayerDialog   open={open} setOpen={setOpen} />

    </div>
  );
};

export default PlayerTracker;
