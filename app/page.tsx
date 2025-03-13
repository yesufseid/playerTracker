'use client';

import { useState} from 'react';
import { Add } from '@mui/icons-material';
import BasicTabs from './component/Tab';
import AddPlayerDialog from './component/Dialog';
import {  Button} from '@mui/material';



const PlayerTracker = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
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
