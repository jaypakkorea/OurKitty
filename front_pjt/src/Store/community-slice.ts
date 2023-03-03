import { createSlice } from '@reduxjs/toolkit';
import { Community } from "./Type/communityType";
import { Slice } from "./Type/global";


interface Init {
    communityList: Array<Community>;
    communitySlice: Slice;
    community: Community;
    isGettingCommunityList: boolean;
    isGettingCommunityDetail: boolean;
    userCommunityCount: number;
}

const initialState: Init = {
    communityList: [],

    communitySlice: {
        content: [],
        empty: false,
        first: true,
        last: false,
        number: 0,
        numberOfElements: 0,
        pageable: {},
        size: 0,
        sort: {},
    },

    community: {
        communityId: 0,
        communityUserId: 0,
        communityCategoryName: "",
        content: "",
        userName: "",
        userImg: "",
        userCommentImg: "",
        likeCount: 0,
        commentCount: 0,
        reportsCount: 0,
        isReport: false,
        isLike: false,
        isScrap: false,
        isUser: false,
        region: "",
        dishId: 0,
        dishName: "",
        communityImgs: [],
        createdAt: "",
        modifiedAt: ""
    },
    isGettingCommunityList: false,
    isGettingCommunityDetail: false,
    userCommunityCount: 0
}

// 초기 값 선언
const communitySlice = createSlice({
    name: 'community',
    initialState,

    reducers: {
        setIsGettingCommunityListOn(state) {
            state.isGettingCommunityList = true;
        },

        setIsGettingCommunityListOff(state) {
            state.isGettingCommunityList = false;
        },

        setIsGettingCommunityDetailOn(state) {
            state.isGettingCommunityDetail = true;
        },

        setIsGettingCommunityDetailOff(state) {
            state.isGettingCommunityDetail = false;
        },


        // 전체 게시글
        getCommunityList(state, action) {
            state.communitySlice = action.payload;

            if (state.communitySlice.first) {
                state.communityList = state.communitySlice.content;
            } else {
                state.communityList = state.communityList.concat(state.communitySlice.content);
            }
        },

        getCommunityListUserCount(state, action) {
            state.userCommunityCount = action.payload;
        },

        // 게시글 좋아요
        getCommunityListLikeOn(state, action) {
            let findCommunity = state.communityList.find((community: Community) => community.communityId === action.payload)!;

            findCommunity.isLike = true;
            findCommunity.likeCount += 1
        },
        getCommunityListLikeOff(state, action) {
            let findCommunity = state.communityList.find((community) => community.communityId === action.payload)!;

            findCommunity.isLike = false;
            findCommunity.likeCount -= 1
        },

        // 게시글 스크랩
        getCommunityListScrapeOn(state, action) {
            let findCommunity = state.communityList.find((community) => community.communityId === action.payload)!;

            findCommunity.isScrap = true;
        },
        getCommunityListScrapeOff(state, action) {
            let findCommunity = state.communityList.find((community) => community.communityId === action.payload)!;

            findCommunity.isScrap = false;
        },


        // 커뮤니티 디테일
        getCommunityDetail(state, action) {
            state.community = action.payload.community;
        },

        communityLikeOn(state) {
            state.community.isLike = true;
            state.community.likeCount += 1
        },
        communityLikeOff(state) {
            state.community.isLike = false;
            state.community.likeCount -= 1
        },

        communityScrapeOn(state) {
            state.community.isScrap = true;
        },
        communityScrapeOff(state) {
            state.community.isScrap = false;
        },

        communityReportOn(state) {
            state.community.reportsCount += 1;
            state.community.isReport = true;
        },

        addCommunityComment(state) {
            state.community.commentCount += 1;
        },
        deleteCommunityComment(state) {
            state.community.commentCount -= 1;
        },
    },
});

export const communityActions = communitySlice.actions;

export default communitySlice;