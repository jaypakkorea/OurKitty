import { authAdminInstance, authInstance } from "../utils/instance";


export function getNoticeList() {
    return authInstance
        .get(`/notices`)
        .then((res) => res.data);
}

export function getNoticeDetail(noticeId: number) {
    return authInstance
        .get(`/notices/${noticeId}`)
        .then((res) => res.data);
}

export function getNoticeComment(noticeId: number) {
    return authInstance
        .get(`/notices/${noticeId}/comments`)
        .then((res) => res.data);
}


export const deleteNotice = async (noticeId: number) => {
    return authAdminInstance
        .delete(`/notices/${noticeId}`);
}


export function postNoticeLike(noticeId: number) {
    return authInstance
        .post(`/notices/${noticeId}/like`)
        .then((res) => res.data);
}

export function postNoticeComment(noticeId: number, body = {}) {
    return authInstance
        .post(`/notices/${noticeId}/comments`, body)
        .then((res) => res.data);
}

export const deleteNoticeComment = async (commentId: number) => {
    return authInstance
        .delete(`/notices/comments/${commentId}`);
}