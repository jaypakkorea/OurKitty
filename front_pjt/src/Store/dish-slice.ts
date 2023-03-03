import { createSlice } from '@reduxjs/toolkit';
import { Dish } from './Type/DishType';

interface Init {
  dishList: Dish[],
  selectedDish: Dish,
  loadingState: boolean,
}

const initialState: Init = {
  dishList: [],
  selectedDish: {
    adminGroup: undefined,
    dishImg: "",
    dishName: "",
    dishState: "",
    foodWeightChangeDate: "",
    food_weight: "",
    id: "",
    lat: "",
    loadAddress: "",
    lon: "",
    otherNote: "",
    serialNumber: "",
    click: false,
  },

  loadingState: false,
}

// 초기 값 선언
const dishSlice = createSlice({
  name: 'dish',
  initialState,

  reducers: {
    setDish(state, action) {
      state.selectedDish = { ...action.payload };
    },
    setDishList(state, action) {
      state.dishList = action.payload.dishList;
    },
    setDishLocation(state, action) {
      state.selectedDish.lon = action.payload.lon;
      state.selectedDish.lat = action.payload.lat;
      state.selectedDish.loadAddress = action.payload.loadAddress;
    },
    setLoadingStateOn(state) {
      state.loadingState = true;
    },
    setLoadingStateOff(state) {
      state.loadingState = false;
    }
  },
});

export const dishAction = dishSlice.actions;

export default dishSlice;