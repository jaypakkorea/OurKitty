import { createSlice } from '@reduxjs/toolkit';

interface init {
    watchId: number
    userLocation: any
}

const initialState: init = {
    watchId: 0,
    userLocation: null
}

// 초기 값 선언
const mapSlice = createSlice({
    name: 'map',
    initialState,

    reducers: {
        setWatchId(state, action) {
            state.watchId = action.payload;
        },
        setUserLocation(state, action) {
            state.userLocation = action.payload;
        },
    },
});

export const mapAction = mapSlice.actions;

export default mapSlice;