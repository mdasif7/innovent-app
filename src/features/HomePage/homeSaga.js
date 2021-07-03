import { takeEvery, call, put, take, all }  from "@redux-saga/core/effects";
import { func } from "prop-types";
import { API, BASEURL } from "../../Utils/API";
import {setCars, setCardDetailsdata} from "./homeSlice"

export function* fetchAllCars(){

    const url=`${BASEURL}/api/cars/`;
    const config = {
        url: url,
        method: "GET"
    }
    const data= yield call(API, config);
    if(data.success){
        yield put(setCars(data.data))
    } else {
        console.log("Error in Fetching Cars")
    }
}
export function* fetchCars(id){
    const url=`${BASEURL}/api/cars/${id.payload}`;
    const config = {
        url: url,
        method: "GET"
    }
    const data= yield call(API, config);
    if(data.success){
        yield put(setCardDetailsdata(data.data))
    } else {
        console.log("Error in Fetching Cars")
    }
}
export function* watchHome(){
    yield takeEvery("GET_ALL_CARS", fetchAllCars);
    yield takeEvery("FETCH_CAR", fetchCars)
}

export default function* homeSaga(){
    yield all([watchHome()])
}