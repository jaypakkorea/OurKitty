//관리자 - 냥그릇 추가
import { adminAuthInstance } from "../utils/adminInstance";
import { authInstance } from "../utils/instance";

export async function addPreference(body: any) {
    try {
        const { data } = await authInstance.post(`/preference`, body);
        return data;
    } catch (error: any) {
        console.error('addPreference', error.response.data);
    }
}


export async function getUserPreference(id: number) {
    try {
        const { data } = await authInstance.get(`/preference/users/${id}`);
        return data;
    } catch (error: any) {
        console.error('getUserPreference', error.response.data);
    }
}

export async function getDishPreferenceList(id: number) {
    try {
        const { data } = await adminAuthInstance.get(`/preference/admins/${id}`);
        return data;
    } catch (error: any) {
        console.error('getDishPreference', error.response.data);
    }
}

//관리자 - 관리중인 모든 냥그릇 선호도 불러오기
export async function GetAllDishPreferenceList() {
    return adminAuthInstance
        .get(`/preference/admins/`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetAllDishPreferenceList 에러'));
}