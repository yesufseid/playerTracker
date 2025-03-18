import { call, put, takeEvery } from "redux-saga/effects";
import {setLoading,setError,setTLoading,setAllPlayer,addAllPlayer,setHasMore,
  setTNewCursor,setDailyPlayer,setWeekliyPlayer,addDailyPlayer,addWeekliyPlayer} from "./statsSlice"
import {GetStatus,GetStatusWeekliy} from "../../lib/index";


function* fetchandSetStatus(action:any): Generator<any, void, any>{
  try {
    yield put(setError(false));
    yield put(setLoading(true));
     // Pass arguments to GetGraduates
     const res=yield call(GetStatusWeekliy);
    yield put(setLoading(false));
    if(res.data){
      yield put(setAllPlayer(res.data))
      yield put(setDailyPlayer(res.dailyData))
      yield put(setWeekliyPlayer(res.weeklyData))
      yield put(setHasMore(res.hasMore))
      yield put(setTNewCursor(res.newCursor))
      
    }else{
      yield put(setError(true))
    }
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }
}
function* fetchandAddStatus(action:any): Generator<any, void, any>{
    try {
      yield put(setError(false));
      yield put(setTLoading(true));
       // Pass arguments to GetGraduates
       const res =yield call(GetStatus,action.payload.limit,action.payload.cursor);
      yield put(setTLoading(false));
      if(res.data){
        yield put(addAllPlayer(res.data))
        yield put(setHasMore(res.hasMore))
        yield put(setTNewCursor(res.newCursor))
        
      }else{
        yield put(setError(true))
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  }
  

export default function* GratuateSaga() {
  yield takeEvery("players/fetchandSetStatus",fetchandSetStatus);
  yield takeEvery("players/fetchandAddStatus",fetchandAddStatus);

}