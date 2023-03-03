import { createSlice } from '@reduxjs/toolkit';

// status 값 예시 (나중에 파일하나로 뺄것)
// const IDLE_STATUS = 'idle';
// const LOADING_STATUS = 'loading';
// const SUCCESS_STATUS = 'success';
// const FAILURE_STATUS = 'failure';


const globalSlice = createSlice({
    name: 'global',
    initialState: { notification: null },
    reducers: {
        showNotification(state: any, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                // message: action.payload.message,
            };
        },
    },
});

export const globalActions = globalSlice.actions;

export default globalSlice;