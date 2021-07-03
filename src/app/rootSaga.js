import homeSaga from "../features/HomePage/homeSaga";
import { fork, all } from "@redux-saga/core/effects";

export default function* rootSaga() {
  yield all([fork(homeSaga)]);
}
