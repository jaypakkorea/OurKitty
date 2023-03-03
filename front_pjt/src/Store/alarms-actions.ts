import {
    EditAdminAlarms,
    EditUserAlarms,
    GetAdminAlarms,
    GetUserAlarms,
    RemoveAdminAlarms,
    RemoveUserAlarms
} from "apis/api/alarm";
import { alarmsActions } from "./alarms-slice";

// 관리자 알람 받아와서 저장
export const fetchAdminAlarmList = () => {
    return async (dispatch: (arg0: { payload: any; type: "alarms/getAdminAlarmsList"; }) => void) => {
        try {
            const adminAlarms = await GetAdminAlarms();

            dispatch(
                alarmsActions.getAdminAlarmsList({
                    adminAlarms: adminAlarms,
                })
            );
            return adminAlarms;
        } catch (error) {
            console.log("adminAlarms데이터 받아오는데 실패함", error)
        }
    };
};
export const fetchAdminAlarmCheck = (id: number) => {
    return async (dispatch: any) => {
        try {
            await EditAdminAlarms(id);
            dispatch(alarmsActions.adminAlarmCheck(id));
            return;
        } catch (error) {
            console.log("알람 체크 실패함", error)
        }
    };
};

export const fetchAdminAlarmDelete = (id: number) => {
    return async (dispatch: any) => {
        try {
            await RemoveAdminAlarms(id);
            dispatch(alarmsActions.getUserAlarmsList(id));
            return;
        } catch (error) {
            console.log("알람 삭제 실패함", error)
        }
    };
};


// 유저 알람 받아와서 저장
export const fetchUserAlarmList = () => {
    return async (dispatch: any) => {
        try {
            const userAlarms = await GetUserAlarms();

            dispatch(
                alarmsActions.getUserAlarmsList({
                    userAlarms: userAlarms,
                })
            );
            return userAlarms;
        } catch (error) {
            console.log("userAlarms 받아오는데 실패함", error)
        }
    };
};
export const fetchUserAlarmCheck = (id: number) => {
    return async (dispatch: any) => {
        try {
            await EditUserAlarms(id);
            dispatch(alarmsActions.userAlarmCheck(id));
            return;
        } catch (error) {
            console.log("알람 체크 실패함", error)
        }
    };
};

export const fetchUserAlarmDelete = (id: number) => {
    return async (dispatch: any) => {
        try {
            await RemoveUserAlarms(id);
            dispatch(alarmsActions.userAlarmDelete(id));
            return;
        } catch (error) {
            console.log("알람 삭제 실패함", error)
        }
    };
};
