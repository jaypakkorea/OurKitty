import {
    GetUserDishList,
    GetUserScrapList,
    GetUserInfo,
    GetUserProfileDishList,
    GetUserProfileCommunityList, GetUserProfilePictureList, GetUserProfile, GetUserProfileCommunityListCount, updateProfileImg
} from "apis/api/user";
import { userActions } from "./user-slice";
import { communityActions } from "./community-slice";
import Swal from "sweetalert2";

export const fetchUserInfo = () => {
    return async (dispatch: (
        arg0: { payload: any; type: "user/loadInfo"; },
    ) => void) => {
        try {
            const UserInfo = await GetUserInfo();
            dispatch(userActions.loadInfo(UserInfo));
            return;
        } catch (error) {
            console.log("fetchUserInfo 받아오는데 실패함", error)
        }
    };
};

// 프로필 유저 조회
export const fetchProfileUser = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(userActions.setIsGettingUserOn());

        try {
            const userProfile = await GetUserProfile(userId);
            dispatch(
                userActions.loadInfo(userProfile)
            );

            return userProfile;
        } catch (error) {
            Swal.fire('존재하지 않는 사용자입니다.', '', 'error').then(() =>
                window.history.back()
            );
        } finally {
            dispatch(userActions.setIsGettingUserOff());
        }
    };
};

// 프로필 유저 작성한 커뮤니티 조회
export const fetchProfileUserCommunityList = (userId: number, page: number) => {
    return async (dispatch: any) => {
        dispatch(communityActions.setIsGettingCommunityListOn());

        try {
            const userProfileCommunitySlice = await GetUserProfileCommunityList(userId, page);
            dispatch(communityActions.getCommunityList(userProfileCommunitySlice));
            return;
        } catch (error) {
            console.log("데이터 받아오는데 실패함", error)
        } finally {
            dispatch(communityActions.setIsGettingCommunityListOff());
        }
    };
};

// 프로필 유저 작성한 커뮤니티 조회
export const fetchProfileUserCommunityListCount = (userId: number) => {
    return async (dispatch: any) => {
        try {
            const userProfileCommunityCount = await GetUserProfileCommunityListCount(userId);
            dispatch(communityActions.getCommunityListUserCount(userProfileCommunityCount));
            return;
        } catch (error) {
            console.log("데이터 받아오는데 실패함", error)
        }
    };
};

// 프로필 유저 좋아요 냥그릇 조회
export const fetchProfileUserDishList = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(userActions.setIsGettingUserDishListOn());

        try {
            const userProfileDishList = await GetUserProfileDishList(userId);
            dispatch(
                userActions.loadLikeDish(userProfileDishList.content)
            );

            return;
        } catch (error) {
            console.log("데이터 받아오는데 실패함", error)
        } finally {
            dispatch(userActions.setIsGettingUserDishListOff());
        }
    };
};

// 프로필 유저 좋아요한 사진 조회
export const fetchProfileUserLikeCatPhoto = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(userActions.setIsGettingUserLikeCatPhotoOn());

        try {
            const userProfilePictureList = await GetUserProfilePictureList(userId);
            dispatch(
                userActions.loadLikeCatPhoto(userProfilePictureList.content)
            );

            return;
        } catch (error) {
            console.log("데이터 받아오는데 실패함", error)
        } finally {
            dispatch(userActions.setIsGettingUserLikeCatPhotoOff());
        }
    };
};

// 프로필 유저 업데이트
export const fetchProfileUserImg = (img: Blob) => {
    return async (dispatch: any) => {
        dispatch(userActions.setLoadingStateOn());

        try {
            const { status, message } = await updateProfileImg(img);
            return { status, message };
        } finally {
            dispatch(userActions.setLoadingStateOff());
        }
    };
};