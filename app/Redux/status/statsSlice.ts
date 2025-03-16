
import { createSlice} from "@reduxjs/toolkit";

type PlayerProps={
  id:string
  name:string
  start_time:string
  duration:number
  active:boolean
  shoe_number: number;

}
interface PlayerState {
  AllPlayers:PlayerProps[];
  loading: boolean;
  error: boolean;
  Tloading: boolean;
  Terror: boolean;
  hasMore:boolean
  newCursor:string
}

const initialState: PlayerState = {
  AllPlayers:[],
  loading: false,
  error: false,
  Tloading: false,
  Terror: false,
  hasMore:false,
  newCursor:""
};
const  playerStatuSlice = createSlice({
  name: "Allplayer",
  initialState,
  reducers: {
    setAllPlayer: (state, action) => {
      state.AllPlayers = action.payload;
    },
    addAllPlayer: (state, action) => {
      state.AllPlayers.push(action.payload)
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
    setHasMore: (state, action) => {
        state.hasMore= state.hasMore=action.payload
      },
      setTNewCursor: (state, action) => {
        state.newCursor= state.newCursor=action.payload
      },
  },
});

export const {setError,setLoading,setTError,setTLoading,setAllPlayer,addAllPlayer,setHasMore,setTNewCursor} =playerStatuSlice.actions;
export default playerStatuSlice.reducer;
