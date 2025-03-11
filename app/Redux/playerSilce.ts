
import { createSlice } from "@reduxjs/toolkit";

const  playerSlice = createSlice({
  name: "player",
  initialState: {players:[],loading:false,error:false},
  reducers: {
    setPlayer: (state, action) => {
      state.players = action.payload;
    },
    addPlayer: (state, action:{}) => {
      state.players.push(action.payload)
    },
    removePlayer: (state, action) => {
      
    },
    addDuration: (state, action) => {
      const { id, duration } = action.payload; 
      const playerIndex = state.players.findIndex(player => player.id === id);
      state.players[playerIndex].duration=duration
    },
    setLoading: (state, action) => {
      state.loading= state.loading=action.payload
    },
    setError: (state, action) => {
      state.error= state.error=action.payload
    },
  },
});

export const { addPlayer,setPlayer,setError,setLoading,} =playerSlice.actions;
export default playerSlice.reducer;
