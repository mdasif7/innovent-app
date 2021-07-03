import counterReducer from "../features/counter/counterSlice";
import homeReducer from "../features/HomePage/homeSlice"

const rootReducer = {
  counter: counterReducer,
  homePage: homeReducer
};

export default rootReducer;
