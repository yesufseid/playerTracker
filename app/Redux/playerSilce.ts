
import { createSlice} from "@reduxjs/toolkit";

type PlayerProps={
  id:string
  name:string
  start_time:string
  duration:number
  active:boolean
  shoe_number: number;
  created_at:string

}
interface PlayerState {
  players: PlayerProps[];
  loading: boolean;
  error: boolean;
  Tloading: boolean;
  Terror: boolean;
}

const initialState: PlayerState = {
  players: [],
  loading: false,
  error: false,
  Tloading: false,
  Terror: false,
};
const  playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.players = action.payload;
    },
    addPlayer: (state, action) => {
      state.players.push(action.payload)
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter((player:PlayerProps)=> player.id !== action.payload)
    },
    addDuration: (state, action) => {
      const { id, duration } = action.payload; 
      const playerIndex = state.players.findIndex((player:PlayerProps )=> player.id === id);
      state.players[playerIndex].duration=duration
    },
    setLoading: (state, action) => {
      state.loading= state.loading=action.payload
    },
    setError: (state, action) => {
      state.error= state.error=action.payload
    },
    setTLoading: (state, action) => {
      state.Tloading= state.Tloading=action.payload
    },
    setTError: (state, action) => {
      state.Terror= state.Terror=action.payload
    },
  },
});

export const { addPlayer,setPlayer,setError,setLoading,addDuration,setTError,setTLoading,removePlayer} =playerSlice.actions;
export default playerSlice.reducer;
