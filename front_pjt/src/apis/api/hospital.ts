import { adminAuthAppFormInstance, adminAuthInstance } from 'apis/utils/adminInstance';
import Swal from 'sweetalert2';
import { baseInstance } from "../utils/instance";

// 동물병원 등록
export async function AddHospital(body = {}) {
    return adminAuthAppFormInstance
        .post(`/hospitals/admins`, body)
        .then((res) => res.data);
}

// 동물병원 리스트 가져오기
export async function GetHospitalList() {
    return adminAuthInstance
        .get(`/hospitals/admins`)
        .then((res) => res.data)
        .catch((err) => Swal.fire("읽어오는 도중 에러가 발생했습니다.", '', 'error'));
}

export async function DeleteHospital(hospitalId: number) {
    return adminAuthInstance
        .delete(`/hospitals/admins/${hospitalId}`)
        .then((res) => res.data);
}

export async function UpdateHospital(body = {}) {
    return adminAuthAppFormInstance
        .put(`/hospitals/admins`, body)
        .then((res) => res.data);
}

export async function getMapHospitals(params: any) {
    return await baseInstance.get(`/hospitals`, { params });
}
