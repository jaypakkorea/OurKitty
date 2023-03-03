import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LayoutFlex } from "Component/Layout/LayoutFlex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as scrapSolid, faThumbsUp as likeSolid } from "@fortawesome/free-solid-svg-icons";
import {
    faBookmark as scrapRegular,
    faComment as commentRegular,
    faThumbsUp as likeRegular
} from "@fortawesome/free-regular-svg-icons";
import { LikeCommunity, ScrapCommunity } from "apis/api/community";
import { communityActions } from "Store/community-slice";
import { useDispatch } from "react-redux";
import { Community } from "../../Store/Type/communityType";

interface Props {
    community: Community
    dishId?: number
}
export function CommunityCard(props: Props) {
    let community = props.community
    let communityId = community.communityId
    const navigate = useNavigate();


    const navigateToPurchase = () => {
        navigate(`/map/dish/${props.dishId}/3/detail/${communityId}`);
    };

    const dispatch = useDispatch();

    // 좋아요
    const isLike = community.isLike;
    const onChangeLike = () => {
        // 좋아요 안한 상태
        if (isLike === false) {
            LikeCommunity(communityId).then(() => dispatch(communityActions.getCommunityListLikeOn(communityId)));
        }
        // 좋아요 한 상태
        else {
            LikeCommunity(communityId).then(() => dispatch(communityActions.getCommunityListLikeOff(communityId)));
        }
    };

    // 스크랩
    const isScrap = community.isScrap;
    const onChangeScarp = () => {
        // 스크랩 안한 상태
        if (!isScrap) {
            ScrapCommunity(communityId).then(() => dispatch(communityActions.getCommunityListScrapeOn(communityId)));
        }
        // 스크랩 한 상태
        else {
            ScrapCommunity(communityId).then(() => dispatch(communityActions.getCommunityListScrapeOff(communityId)));
        }
    }

    return (
        <LayoutCard>
            <LayoutFlex justify={"space-between"} width={"100%"}>
                <LinkDiv onClick={navigateToPurchase}>
                    <div style={{ fontSize: "1.2rem" }}>{community.userName}</div>
                </LinkDiv>

                {/*스크랩*/}
                {isScrap ? <FontAwesomeIcon icon={scrapSolid} style={{ cursor: 'pointer' }}
                    onClick={onChangeScarp} /> :
                    <FontAwesomeIcon icon={scrapRegular} style={{ cursor: 'pointer' }}
                        onClick={onChangeScarp} />}
            </LayoutFlex>
            <LinkDiv onClick={navigateToPurchase}>
                <ContentDiv>
                    {community.content}
                </ContentDiv>

                <FlexImgDiv>
                    {community.communityImgs.length === 1 ?
                        <CustomImg src={community.communityImgs[0]} alt="catFeet" width="100%" />
                        :

                        community.communityImgs.length !== 0 &&
                        community.communityImgs.map((content: any) => (
                            <CustomImg src={content} alt="catFeet" width="50%" height="160" />
                        ))
                    }
                </FlexImgDiv>

                <LayoutFlex justify={"space-between"} width={"100%"}>
                    {community.dishName && <SubText>{community.dishName}</SubText>}
                    <SubText>{community.region}</SubText>
                    <SubText>{community.createdAt.split('T')[0]} {community.createdAt.substr(11, 5)}</SubText>
                </LayoutFlex>
            </LinkDiv>

            <LayoutFlex gap={"0.5rem"}>
                <LayoutFlex gap={"0.2rem"} width={"auto"}>
                    {/*좋아요*/}
                    {isLike ?
                        <FontAwesomeIcon icon={likeSolid} style={{ cursor: 'pointer' }} onClick={onChangeLike} /> :
                        <FontAwesomeIcon icon={likeRegular} style={{ cursor: 'pointer' }}
                            onClick={onChangeLike} />}

                    {/*댓글*/}
                    {community.likeCount}
                </LayoutFlex>

                <LayoutFlex gap={"0.2rem"} width={"auto"}>
                    <FontAwesomeIcon icon={commentRegular} />
                    {community.commentCount}
                </LayoutFlex>

            </LayoutFlex>
        </LayoutCard >
    );
};

const LayoutCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;
  min-width: 100%;
  margin-bottom: 16px;

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;

const LinkDiv = styled.div`
    width: 100%;
    cursor: pointer;
`
const ContentDiv = styled.div`
    padding: 1rem 0;
`
const SubText = styled.div`
    font-size: 0.9rem;
    color: gray;
`
const FlexImgDiv = styled.div`
  display: flex;
  overflow: auto;
  white-space: nowrap;
  
  margin-bottom: 1rem;

  ::-webkit-scrollbar {
    display: none;
  }
`

const CustomImg = styled.img`
  border-radius: 10px;
  
  padding: 0.2rem;
`