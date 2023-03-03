import { createSlice } from '@reduxjs/toolkit';

interface admin {
    id: number,
    adminEmail: string,
    groupName: string,
    groupId: number,
    adminPassword: null,
    adminName: string,
    adminPhone: string,
    adminRole: string,
    adminState: number
}


interface init {
    admin: admin,
    loading: boolean,
    groups: Array<string>
}


const initialState: init = {
    admin: {
        id: 0,
        adminEmail: '',
        groupName: '',
        groupId: 0,
        adminPassword: null,
        adminName: '',
        adminPhone: '',
        adminRole: '',
        adminState: 0
    },
    loading: false,
    groups: []
}

// 초기 값 선언
const adminSlice = createSlice({
    name: 'admin',
    initialState,

    reducers: {
        loadInfo(state, action) {
            state.admin.id = action.payload.admin.id;
            state.admin.adminEmail = action.payload.admin.adminEmail;
            state.admin.groupName = action.payload.admin.groupName;
            state.admin.groupId = action.payload.admin.groupId;
            state.admin.adminName = action.payload.admin.adminName;
            state.admin.adminPhone = action.payload.admin.adminPhone;
            state.admin.adminRole = action.payload.admin.adminRole;
            state.admin.adminState = action.payload.admin.adminState;
        },
        getGroup(state, action) {
            state.groups = action.payload.groups;
        }
    },
});

export const adminActions = adminSlice.actions;

export default adminSlice;