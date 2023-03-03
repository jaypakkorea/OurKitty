import { GetCommunity, GetCommunityLIst, GetDishCommunity, ScrapCommunityList } from "apis/api/community";
import { communityActions } from "./community-slice";
import { AppDispatch } from "./index";
import Swal from 'sweetalert2';

// 전체 커뮤니티 조회
export const fetchCommunityList = (tagId: number, page: number) => {
    return async (dispatch: (arg0: { payload: any; type: "community/getCommunityList"; }) => void) => {

        // @ts-ignore
        dispatch(communityActions.setIsGettingCommunityListOn());

        try {
            const communitySlice = await GetCommunityLIst(tagId);

            dispatch(communityActions.getCommunityList(communitySlice));
            return;
        } catch (error) {
            console.log("데이터 받아오는데 실패함", error)
        } finally {
            // 로딩끝
            // @ts-ignore
            dispatch(communityActions.setIsGettingCommunityListOff());
        }
    };
};

// 로그인유저 스크랩 커뮤니티 조회
export const fetchCommunityScrapList = (page: number) => {
    return async (dispatch: any) => {

        // @ts-ignore
        dispatch(communityActions.setIsGettingCommunityListOn());

        try {
            const communitySlice = await ScrapCommunityList();
            dispatch(communityActions.getCommunityList(communitySlice));
            return;
        } catch (error) {
            console.log("데이터 받아오는데 실패함", error)
        } finally {
            // 로딩끝
            // @ts-ignore
            dispatch(communityActions.setIsGettingCommunityListOff());
        }
    };
};

// 해당 냥그릇 커뮤니티 조회
export const fetchDishCommunityList = (dishId: number, tagId: number, page: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(communityActions.setIsGettingCommunityListOn());

        try {
            const communitySlice = await GetDishCommunity(dishId, tagId, page);

            dispatch(
                communityActions.getCommunityList(communitySlice)
            );

            return;
        } catch (error) {
            console.log("데이터 받아오는데 실패함", error)
        } finally {
            dispatch(communityActions.setIsGettingCommunityListOff());
        }
    };
};

// 하나 커뮤니티 조회
export const fetchCommunityDetail = (communityId: number) => {
    return async (dispatch: (arg0: { payload: any; type: any }) => void) => {
        dispatch(communityActions.setIsGettingCommunityDetailOn());

        try {
            const communityDetail = await GetCommunity(communityId);

            dispatch(
                communityActions.getCommunityDetail({
                    community: communityDetail,
                })
            );


            return communityDetail;
        } catch (error) {
            Swal.fire('존재하지 않는 게시글입니다.', '', 'error').then(() =>
                window.history.back()
            );
        } finally {
            dispatch(communityActions.setIsGettingCommunityDetailOff());
        }
    };
};
