import { call, put, takeEvery } from "redux-saga/effects";
import {setPlayer,setLoading,setError,addPlayer,addDuration,setTLoading,setTError,removePlayer,setAllPlayer,addAllPlayer} from "./playerSilce"
import { GetAll,AddPlayer,AddTime,deletePlayer,UpdateStatus ,GetStatus} from "../lib/index";


function* fetchPlayers(): Generator<any, void, any>{
  try {
    yield put(setError(false));
    yield put(setLoading(true));
     // Pass arguments to GetGraduates
     const response =yield call(GetAll);
    yield put(setLoading(false));
    if(response.error){
      yield put(setError(true))
    }else{
      yield put(setPlayer(response))
    }
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }
}
function* fetchandSetStatus(action:any): Generator<any, void, any>{
  try {
    yield put(setError(false));
    yield put(setLoading(true));
     // Pass arguments to GetGraduates
     const response =yield call(GetStatus,action.limit,action.cursor);
    yield put(setLoading(false));
    if(response.error){
      yield put(setError(true))
    }else{
      yield put(setAllPlayer(response))
    }
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }
}
function* fechandAddPlayers(action:any): Generator<any, void, any> {
  try {
    yield put(setTError(false));
    yield put(setTLoading(true));
     // Pass arguments to GetGraduates
     const response =yield call(AddPlayer,action.payload.name,action.payload.shoeNumber, action.payload.startTime);
    yield put(setTLoading(false));
    if(response.error){
      yield put(setTError(true))
    }else{
      yield put(addPlayer(response))
    }    
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }
}
function* fechandAddTime(action:any): Generator<any, void, any> {
  try {
    yield put(setTError(false));
    yield put(setTLoading(true));
     // Pass arguments to GetGraduates
     const response =yield call(AddTime,action.payload.id, action.payload.duration);
    yield put(setTLoading(false));
    if(response.error){
      yield put(setTError(true))
    }else{
      yield put(addDuration(response))
    }    
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }
}

function* fechandremove(action:any): Generator<any, void, any> {
  try {
    yield put(setTError(false));
    yield put(setTLoading(true));
     // Pass arguments to GetGraduates
     const response =yield call(deletePlayer,action.payload.id);
    yield put(setTLoading(false));
    if(response.error){
      yield put(setTError(true))
    }else{
      yield put(removePlayer(response.id))
    }    
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }
}
function* fechandupdateStatus(action:any): Generator<any, void, any>{
  try {
    yield put(setTError(false));
    yield put(setTLoading(true));
     // Pass arguments to GetGraduates
     const response =yield call(UpdateStatus,action.payload.id);
    yield put(setTLoading(false));
    if(response.error){
      yield put(setTError(true))
    }else{
      yield put(removePlayer(response.id))
    }    
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }
}
export default function* GratuateSaga() {
  yield takeEvery("players/fetchPlayers",fetchPlayers);
  yield takeEvery("players/fechandAddPlayers",fechandAddPlayers);
  yield takeEvery("players/fechandAddTime",fechandAddTime);
  yield takeEvery("players/fechandremove",fechandremove);
  yield takeEvery("players/fechandupdateStatus",fechandupdateStatus);
  yield takeEvery("players/fetchandSetStatus",fetchandSetStatus);

}