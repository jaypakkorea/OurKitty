import { adminAuthInstance } from 'apis/utils/adminInstance';
import { authInstance } from '../utils/instance';

// 관리자 알람 불러오기
export async function GetAdminAlarms() {
    return await adminAuthInstance
        .get(`/alarms/admins`)
        .then((res) => res.data)
        .catch((err) => console.error(err, '관리자 알람 에러'))
}

// 관리자 알람 상태 변경
export async function EditAdminAlarms(id: number) {
    return await adminAuthInstance
        .put(`/alarms/admins/${id}`)
        .then((res) => res.data)
        .catch((err) => console.error(err, '관리자 알람 수정 에러'))
}
// 관리자 알람 삭제
export async function RemoveAdminAlarms(id: number) {
    return await adminAuthInstance
        .delete(`/alarms/admins/${id}`)
        .then((res) => res.data)
        .catch((err) => console.error(err, '관리자 알람 삭제 에러'))
}
// 유저 알람 불러오기
export async function GetUserAlarms() {
    return await authInstance
        .get(`/alarms/users`)
        .then((res) => res.data)
        .catch((err) => console.error(err, '유저 알람 에러'))
}

// 유저 알람 상태 변경
export async function EditUserAlarms(id: number) {
    return await authInstance
        .put(`/alarms/users/${id}`)
        .then((res) => res.data)
        .catch((err) => console.error(err, '유저 알람 수정 에러'))
}
// 유저 알람 삭제
export async function RemoveUserAlarms(id: number) {
    return await authInstance
        .delete(`/alarms/users/${id}`)
        .then((res) => res.data)
        .catch((err) => console.error(err, '유저 알람 삭제 에러'))
}
