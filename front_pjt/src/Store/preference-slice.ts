import { createSlice } from '@reduxjs/toolkit';
import { Preference } from "./Type/preference";

interface init {
    preferenceList: Array<Preference>
    userPreference: Preference,
    isGettingPreferenceList: boolean,
    isGettingUserPreference: boolean
}

const initialState: init = {
    preferenceList: [{
        preferenceId: 0,
        dishId: 0,
        userId: 0,
        userName: "",
        preferenceResult: 0,
        reason: "",
        writingDate: "",
        updatingDate: ""
    },],
    userPreference: {
        preferenceId: 0,
        dishId: 0,
        userId: 0,
        userName: "",
        preferenceResult: 0,
        reason: "",
        writingDate: "",
        updatingDate: ""
    },
    isGettingPreferenceList: false,
    isGettingUserPreference: false


}

// 초기 값 선언
const preferenceSlice = createSlice({
    name: 'preference',
    initialState,

    reducers: {
        getPreferenceList(state, action) {
            state.preferenceList = action.payload;
        },
        getUserPreference(state, action) {
            state.userPreference = action.payload;
        },

        isGettingPreferenceListOn(state) {
            state.isGettingPreferenceList = true;
        },
        isGettingPreferenceListOff(state) {
            state.isGettingPreferenceList = false;
        },
        isGettingUserPreferenceOn(state) {
            state.isGettingPreferenceList = true;
        },
        isGettingUserPreferenceOff(state) {
            state.isGettingPreferenceList = false;
        },
    },
});

export const preferenceAction = preferenceSlice.actions;

export default preferenceSlice;