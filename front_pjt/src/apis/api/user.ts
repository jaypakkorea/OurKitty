import { authInstance, baseInstance, authFormInstance } from "apis/utils/instance";

// 유저 정보
export async function GetUserInfo() {
    const token = localStorage.getItem('token')
    return baseInstance
        .get(`https://ourkitty.site/auth/users`,
            {
                headers: { Authorization: token }
            }
        )
        .then((res) => {
            return res.data
        })
        .catch((err) => console.error(err, 'GetUserInfo 에러야'));
}


// 유저 좋아요 냥그릇
export async function GetUserDishList() {
    const token = localStorage.getItem('token')
    return await baseInstance
        .get(`/dishes/like`,
            {
                headers: { Authorization: token }
            }
        )
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetUserDishList 에러야'));
}

// 유저 스크랩 게시글
export async function GetUserScrapList() {
    return await authInstance
        .get(`/communities/user/scrap`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetUserScrapList 에러야'));
}

// 유저 프로필 조회
export async function GetUserProfile(userId: number, page?: number) {
    return await authInstance
        .get(`/users/${userId}`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetUserScrapList 에러야'));
}

// 프로필 유저 커뮤니지 작성목록
export async function GetUserProfileCommunityList(userId: number, page: number) {
    return await authInstance
        .get(`/users/${userId}/communities?page=${page}&size=20&sort=createdDate,desc`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetUserProfileCommunityList 에러야'));
}
// 프로필 유저 커뮤니지 작성개수
export async function GetUserProfileCommunityListCount(userId: number) {
    return await authInstance
        .get(`/users/${userId}/communities/count`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetUserProfileCommunityListCount 에러야'));
}

// 프로필 유저 이미지 리스트
export async function GetUserProfilePictureList(userId: number) {
    return await authInstance
        .get(`/users/${userId}/pictures`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetUserProfilePictureList 에러야'));
}

// 프로필 유저 냥그릇 리스트
export async function GetUserProfileDishList(userId: number) {
    return await authInstance
        .get(`/users/${userId}/dish`)
        .then((res) => res.data)
        .catch((err) => console.error(err, 'GetUserScrapList 에러야'));
}

// 프로필 유저 사진 업데이트
export async function updateProfileImg(img: Blob) {
    const formData = new FormData();
    formData.append('profileImage', img);

    return await authFormInstance
        .put(`/users/profile-img`, formData)
        .then((res) => res)
        .catch((err) => err.response.data);
}

// 프로필 유저 이름 업데이트
export async function updateProfileUserName(body: any) {
    return await authInstance
        .put(`/users/nick-name`, body)
        .then((res) => res)
        .catch((err) => err.response.data);
}

// 프로필 유저 위치 동의 업데이트
export async function updateProfileLocationAllow() {
    return await authInstance
        .put(`/users/location-provision`)
        .then((res) => res)
        .catch((err) => err.response.data);
}

