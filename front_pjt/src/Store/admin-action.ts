import { GetAdminUserInfo, GetgroupsList } from "apis/api/admin";
import { adminActions } from "./admin-slice";


export const fetchAdminUserInfo = () => {
    return async (dispatch: (
        arg0: { payload: any; type: "admin/loadInfo"; },
    ) => void) => {
        try {
            const AdminUserInfo = await GetAdminUserInfo();

            dispatch(
                adminActions.loadInfo({
                    admin: AdminUserInfo || [],
                })
            );


            return AdminUserInfo;
        } catch (error) {
            console.log("fetchUserInfo 받아오는데 실패함", error)
        }
    };
};


export const fetchGroupsList = () => {
    return async (dispatch: (
        arg0: { payload: any; type: "admin/getGroup"; },
    ) => void) => {
        try {
            const groupsList = await GetgroupsList();


            dispatch(
                adminActions.getGroup({
                    groups: groupsList,
                })
            );
            return groupsList;
        } catch (error) {
            console.log("groupsList 받아오는데 실패함", error)
        }
    };
};
