import { adminAuthAppFormInstance, adminAuthInstance } from 'apis/utils/adminInstance';

// 관리자 등록
export async function SignUpAdmin(body = {}) {
    return adminAuthAppFormInstance
        .post(`https://ourkitty.site/auth/admins`, body)
        .then((res) => res.data)
}

// 로그인
export async function LoginAdmin(body = {}) {
    return adminAuthAppFormInstance
        .post(`https://ourkitty.site/auth/login`, body)
        .then((res) => {
            localStorage.setItem('adminToken', res.data.token);
            localStorage.setItem('adminRefresh', res.data.adminRefresh);
            return res.data
        })
}

// 관리자 소속 정보
export async function GetgroupsList() {
    return adminAuthInstance
        .get(`/admins/groups`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetBelongList 에러'));
}


// 관리자 유저 정보
export async function GetAdminUserInfo() {
    return adminAuthInstance
        .get(`https://ourkitty.site/auth/admins/authentication`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetAdminUserInfo 에러야'));
}

// 관리자 정보 수정
export async function UpdateAdminInfo(body = {}) {
    return adminAuthAppFormInstance
        .put(`/admins/`, body)
        .then((res) => res.data);
}

// 특정 냥그릇의 신고된 글 목록 조회
export async function GetDishReportCommunity(id: number) {
    return adminAuthInstance
        .get(`/admins/reports?dishId=${id}`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetDishReportCommunity 에러'));
}

//전체 게시판의 신고된 글 목록 조회
export async function GetAllReportCommunity() {
    return adminAuthInstance
        .get(`/admins/reports`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetAllReportCommunity 에러'));
}

//특정 글의 신고 목록 확인
export async function GetReportByCommunity(id: number) {
    return adminAuthInstance
        .get(`/admins/reports/${id}`)
        .then((res) => res.data)
        //.catch((err) => console.error(err, 'GetReportByCommunity 에러'));
}

//신고된 게시글 상세 조회하기
export async function GetReportCommunity(id: number) {
    return adminAuthInstance
        .get(`/admins/communities/${id}`)
        .then((res) => res.data)
        //.catch((err) => console.error(err, 'GetReportCommunity 에러'));
}

//신고게시글 block 처리하기
export async function BlockCommunity(id: number) {
    return adminAuthInstance
        .put(`/admins/reports/${id}`)
        .then((res) => res.data)
        //.catch((err) => console.error(err, 'BlockCommunity 에러'));
}

//신고게시글 block 처리 해제하기
export async function BlockOffCommunity(id: number) {
    return adminAuthInstance
        .put(`/admins/reports/off/${id}`)
        .then((res) => res.data)
        //.catch((err) => console.error(err, 'BlockOffCommunity 에러'));
}
