import { createSlice } from '@reduxjs/toolkit';
import { Community } from "./Type/communityType";
import { IotImages } from "./Type/iotImagesType";

interface User {
    userId: number,
    userName: string,
    userPicture: string,
    isAgree: boolean,
    userState: number,
    userTokenId: string,
    userDishList: Array<string>,
    userLikeCatPhoto: Array<IotImages>,
    userCreatedCommunity: Array<Community>,
    userCreatedComment: Array<string>,
    userLikedCommunity: Array<Community>,
    userScrapCommunity: Array<Community>,
    userExclamCommunity: Array<Community>
}


interface init {
    user: User,
    isGettingUser: boolean,
    isGettingUserCreatedCommunity: boolean,
    isGettingUserLikeCatPhoto: boolean,
    isGettingUserDishList: boolean,
    loadingState: boolean,
}


const initialState: init = {
    user: {
        userId: 0,
        userName: '',
        userPicture: '',
        isAgree: false,
        userState: 0,
        userTokenId: '',
        userDishList: [],
        userLikeCatPhoto: [],
        userCreatedCommunity: [],
        userCreatedComment: [],
        userLikedCommunity: [],
        userScrapCommunity: [],
        userExclamCommunity: []
    },
    isGettingUser: false,
    isGettingUserCreatedCommunity: false,
    isGettingUserLikeCatPhoto: false,
    isGettingUserDishList: false,

    loadingState: false,
}

// 초기 값 선언
const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        loadScrapCommunity(state, action) {
            state.user.userScrapCommunity = action.payload.user;
        },
        loadInfo(state, action) {
            state.user.userId = action.payload.id;
            state.user.userName = action.payload.nickName;
            state.user.userPicture = action.payload.profileImg;
            state.user.isAgree = action.payload.isAgree;
        },
        loadLikeCatPhoto(state, action) {
            state.user.userLikeCatPhoto = action.payload;
        },
        loadCreatedCommunity(state, action) {
            state.user.userCreatedCommunity = action.payload;
        },
        loadLikeDish(state, action) {
            state.user.userDishList = action.payload;
        },

        setIsGettingUserOn(state) {
            state.isGettingUserLikeCatPhoto = true
        },
        setIsGettingUserOff(state) {
            state.isGettingUserLikeCatPhoto = false
        },

        setIsGettingUserCreatedCommunityOn(state) {
            state.isGettingUserCreatedCommunity = true
        },
        setIsGettingUserCreatedCommunityOff(state) {
            state.isGettingUserCreatedCommunity = false
        },

        setIsGettingUserLikeCatPhotoOn(state) {
            state.isGettingUserLikeCatPhoto = true
        },
        setIsGettingUserLikeCatPhotoOff(state) {
            state.isGettingUserLikeCatPhoto = false
        },

        setIsGettingUserDishListOn(state) {
            state.isGettingUserDishList = true
        },
        setIsGettingUserDishListOff(state) {
            state.isGettingUserDishList = false
        },
        setLoadingStateOn(state) {
            state.loadingState = true;
        },
        setLoadingStateOff(state) {
            state.loadingState = false;
        }
    },
});

export const userActions = userSlice.actions;

export default userSlice;