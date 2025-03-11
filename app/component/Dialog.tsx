"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';

function AddPlayerDialog({ open, setOpen }:{open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
   const dispatch = useDispatch<AppDispatch>();
   const { players, error, loading, } = useSelector((state: RootState) => state.player);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    shoeNumber: '',
    startTime:new Date().toISOString(), // default to 'now'
    Time:'now',  // for custom time
  });
const handleSumit=()=>{
  console.log(newPlayer.Time);
  
      dispatch({ type: "players/fechandAddPlayers",payload:newPlayer});
}
  const handleStartTimeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setNewPlayer({ ...newPlayer, Time:event.target.value,});
  };

  const handleCustomTimeChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPlayer({ ...newPlayer, startTime:e.target.value });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add New Player</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          required={true}
          fullWidth
          value={newPlayer.name}
          onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Shoe Number"
          type="number"
          required={true}
          fullWidth
          value={newPlayer.shoeNumber}
          onChange={(e) => setNewPlayer({ ...newPlayer, shoeNumber: e.target.value })}
        />
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={newPlayer.Time}
            onChange={handleStartTimeChange}
          >
            <FormControlLabel value="now" control={<Radio />} label="Now" />
            <FormControlLabel value="custom" control={<Radio />} label="Custom" />
          </RadioGroup>
        </FormControl>
        {newPlayer.Time === 'custom' && (
          <TextField
            margin="dense"
            label="Custom Start Time"
            type="datetime-local"
            required={true}
            fullWidth
            value={newPlayer.startTime}
            onChange={(e)=>handleCustomTimeChange(e)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          color="primary"
          onClick={() => {
            handleSumit()
            setOpen(false);
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddPlayerDialog;
