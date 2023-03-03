import { configureStore } from "@reduxjs/toolkit";
import iotSlice from "./iot-slice";
import communitySlice from "./community-slice";
import userSlice from "./user-slice";
import commentSlice from "./comment-slice";
import alarmsSlice from "./alarms-slice";
import adminSlice from "./admin-slice";
import mapSlice from "./map-slice";
import preferenceSlice from "./preference-slice";
import dishSlice from "./dish-slice";
import { shallowEqual, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const store = configureStore({
    reducer: {
        iot: iotSlice.reducer,
        community: communitySlice.reducer,
        comment: commentSlice.reducer,
        user: userSlice.reducer,
        alarms: alarmsSlice.reducer,
        admin: adminSlice.reducer,
        map: mapSlice.reducer,
        preference: preferenceSlice.reducer,
        dish: dishSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function useSelectorTyped<T>(fn: (state: RootState) => T): T {
    return useSelector(fn, shallowEqual);
}