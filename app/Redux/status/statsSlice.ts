
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
  dailyData:PlayerProps[],
  weeklyData:PlayerProps[],
}

const initialState: PlayerState = {
  AllPlayers:[],
  dailyData:[],
  weeklyData:[],
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
    setDailyPlayer: (state, action) => {
      state.dailyData = action.payload;
    },
    setWeekliyPlayer: (state, action) => {
      state.weeklyData = action.payload;
    },
    addAllPlayer: (state, action) => {
      const newPlayers = action.payload.filter(
        (player:PlayerProps) => !state.AllPlayers.some((existing) => existing.id === player.id)
      );
      state.AllPlayers = [...state.AllPlayers, ...newPlayers];
    },
    addDailyPlayer: (state, action) => {
      const newPlayers = action.payload.filter(
        (player:PlayerProps) => !state.dailyData.some((existing) => existing.id === player.id)
      );
      state.dailyData = [...state.dailyData, ...newPlayers];
    },
    addWeekliyPlayer: (state, action) => {
      const newPlayers = action.payload.filter(
        (player:PlayerProps) => !state.weeklyData.some((existing) => existing.id === player.id)
      );
      state.weeklyData = [...state.weeklyData, ...newPlayers];
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

export const {setError,setLoading,setTError,setTLoading,setAllPlayer,
  addAllPlayer,setHasMore,setTNewCursor,setDailyPlayer,setWeekliyPlayer,addDailyPlayer,addWeekliyPlayer} =playerStatuSlice.actions;
export default playerStatuSlice.reducer;
