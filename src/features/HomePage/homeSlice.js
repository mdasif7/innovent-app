import { createSlice } from "@reduxjs/toolkit";
export const homeSlice = createSlice({
  name: "homePage",
  initialState: {
    cars: [],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload.cars;
    },
    setCardDetailsdata: (state, action) => {
      state.carDetails = action.payload.Car;
    },
  },
});
export const { setCars, setCardDetailsdata } = homeSlice.actions;

export const totalCars = (state) => state.homePage.cars;
export const carDetails = (state) => state.homePage.carDetails;
export default homeSlice.reducer;
