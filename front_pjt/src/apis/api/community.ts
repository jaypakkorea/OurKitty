import { authInstance, authFormInstance } from '../utils/instance';

// 커뮤니티 전체 불러오기
export async function GetCommunityLIst(tagId: number) {
    return await authInstance
        .get(`/communities/user?tagId=${tagId}`)
        .then((res) => res.data);
}

//게시글 등록
export async function CreateCommunity(body = {}) {
    return await authFormInstance
        .post(`/communities/user`, body)
        .then((res) => res.data)
        .catch((res) => console.log(res.response.data.message));
}

//게시글 하나 불러오기
export async function GetCommunity(id: number) {
    return await authInstance
        .get(`/communities/user/${id}`)
        .then((res) => res.data)
}


// 게시글 하나 수정하기
export async function EditCommunity(id: number, body: any) {
    return await authInstance
        .put(`/communities/user/${id}`, body)
        .then((res) => res.data);
}

// 게시글 하나 삭제하기
export async function RemoveCommunity(id: number) {
    return await authInstance
        .delete(`/communities/user/${id}`)
        .then((res) => res.data);
}

//게시글 좋아요
export async function LikeCommunity(id: number) {
    return await authInstance
        .post(`/communities/user/${id}/like`)
        .then((res) => res.data);
}

// 게시글 스크랩
export async function ScrapCommunity(id: number) {
    return await authInstance
        .post(`/communities/user/${id}/scrap`)
        .then((res) => res.data);
}

// 스크랩한 게시글 불러오기
export async function ScrapCommunityList() {
    return await authInstance
        .get(`/communities/user/scrap`)
        .then((res) => res.data);
}


// 게시글 신고
export async function ReportCommunity(id: number, body: any) {
    return await authInstance
        .post(`/communities/user/${id}/report`, body)
        .then((res) => res.data);
}

// 댓글 리스트 가져오기
export async function CommunityCommentList(id: number) {
    return await authInstance
        .get(`/communities/user/${id}/comments`)
        .then((res) => res.data);
}

// 댓글 작성하기
export async function CreateCommunityComment(id: number, body = {}) {
    return await authInstance
        .post(`/communities/user/${id}/comments`, body)
        .then((res) => res.data);
}

// 댓글 삭제하기
export async function RemoveCommunityComment(cid: number, id: number) {
    return await authInstance
        .delete(`/communities/user/comments/${id}`)
        .then((res) => res.data);
}

// 댓글 좋아요
export async function CommunityCommentLike(cid: number, id: number, body = {}) {
    return await authInstance
        .post(`/communities/user/comments/${id}/like`, body)
        .then((res) => res.data);
}

// 해당 냥그릇 Iot 이미지 불러오기
export async function GetIotImgs(dish_id: number, page: number) {
    return await authInstance
        .get(`/pictures/dishes/${dish_id}?page=${page}&size=30&sort=createdDate,desc`)
        .then((res) => res.data);
}

// 해당 냥그릇 커뮤니티 불러오기
export async function GetDishCommunity(dishId: number, tagId: number, page: number) {
    return await authInstance
        .get(`/communities/user/dishes/${dishId}?tagId=${tagId}&page=${page}&size=20&sort=createdDate,desc `)
        .then((res) => res.data);
}



