// @flow
import InfiniteScroll from 'react-infinite-scroll-component';
import Load from "./Load";
import { CommunityCard } from "../containers/userCommunity/CommunityCard";
import styled from "styled-components";
import { Community } from "../Store/Type/communityType";
import { fetchCommunityScrapList, fetchDishCommunityList } from "../Store/community-actions";
import useSelectorTyped, { useAppDispatch } from "../Store";
import { fetchProfileUserCommunityList } from "../Store/user-action";
import Container from './Layout/Container';
import { useEffect } from "react";

interface Props {
    tagId?: number
    dishId?: number
    userId?: number
    type: "Dish" | "Profile" | "Scrap"
};

export function InfiniteScrollCommunity(props: Props) {
    const tagId = props.tagId
    const dishId = props.dishId
    const userId = props.userId
    const type = props.type;

    const dispatch = useAppDispatch();

    const { communityList, communitySlice } = useSelectorTyped(state => ({
        communityList: state.community.communityList,
        communitySlice: state.community.communitySlice
    }));
    const page = communitySlice.number;

    useEffect(() => {
        if (type === "Dish") {
            dispatch(fetchDishCommunityList(dishId!, tagId!, 0));
        } else if (type === "Profile") {

            dispatch(fetchProfileUserCommunityList(userId!, 0))
        } else if (type === "Scrap") {
            dispatch(fetchCommunityScrapList(0));
        }
    }, [tagId])


    const nextSlice = () => {


        if (type === "Dish") {
            dispatch(fetchDishCommunityList(dishId!, tagId!, page + 1))
        } else if (type === "Profile") {
            dispatch(fetchProfileUserCommunityList(userId!, page + 1))
        } else if (type === "Scrap") {
            dispatch(fetchCommunityScrapList(page + 1));
        }
    }


    return (
        <Container id={type}>
            <InfiniteScrollContainer>
                <InfiniteScroll
                    dataLength={communityList.length} //반복되는 컴포넌트의 개수
                    next={nextSlice} //스크롤이 화면 맨 아래에 닿았을때 부르는 함수
                    hasMore={!communitySlice.last} ///추가 데이터가 있는지 여부
                    loader={<Load />} //로딩바
                    style={
                        {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyItems: 'center',
                        }
                    }
                    scrollableTarget={type}
                >
                    {(communitySlice.empty) ?
                        <Exception>등록된 <p></p> 게시글이 없어요~</Exception>
                        :

                        communityList.map((community: Community, index) => (
                            <CommunityCard key={index} community={community}
                                dishId={dishId} />
                        ))}
                </InfiniteScroll>
            </InfiniteScrollContainer>
        </Container>
    );
};

const Exception = styled.div`
  font-size: 3rem;
  text-align: center;
  width: 100%;
  margin: 3rem 0 auto;
  font-family: BMJUA;
`

const InfiniteScrollContainer = styled.div`
  margin-bottom: 10rem;
`