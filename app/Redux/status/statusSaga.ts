import { call, put, takeEvery } from "redux-saga/effects";
import {setLoading,setError,setTLoading,setAllPlayer,addAllPlayer,setHasMore,setTNewCursor} from "./statsSlice"
import { GetStatus} from "../../lib/index";


function* fetchandSetStatus(action:any): Generator<any, void, any>{
  try {
    yield put(setError(false));
    yield put(setLoading(true));
     // Pass arguments to GetGraduates
     const res=yield call(GetStatus,action.payload.limit,action.payload.cursor);
    yield put(setLoading(false));
    yield put(setAllPlayer(res.data))
    if(res.error){
      yield put(setError(true))
    }else{
      yield put(setAllPlayer(res.data))
      yield put(setHasMore(res.hasMore))
      yield put(setTNewCursor(res.newCursor))
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
       const {data,error,hasMore,newCursor} =yield call(GetStatus,action.payload.limit,action.payload.cursor);
      yield put(setTLoading(false));
      if(error){
        yield put(setError(true))
      }else{
        yield put(addAllPlayer(data))
        yield put(setHasMore(hasMore))
        yield put(setTNewCursor(newCursor))
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  }
  

export default function* GratuateSaga() {
  yield takeEvery("players/fetchandSetStatus",fetchandSetStatus);
  yield takeEvery("players/fetchandAddStatus",fetchandAddStatus);

}