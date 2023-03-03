import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Smile from "assets/images/smileIcon.png";
import Face from "assets/images/face.png";
import StateInfoTable from "./stateInfoTable";
import { GetIotImgs } from 'apis/api/community';

interface ImgType {
  imgId: number,
  imgUrl: string,
  date: string,
}

function StateInfo() {
  const [contents, setContents] = useState<ImgType[]>([]);
  const strimUrl = window.location.href.charAt(window.location.href.length - 1) === '/' ? window.location.href.substring(0, window.location.href.length - 1) : window.location.href;
  const dishId: number = Number(strimUrl[strimUrl.length - 1]);

  useEffect(() => {
    getIotImages();
  }, [contents]);

  const getIotImages = async () => {
    const imgList: ImgType[] = [];
    const { content } = await GetIotImgs(dishId, 0);

    for (let item of content) {
      let date = item.createdDate.split('T')[0] + " " + item.createdDate.substring(11, 16);
      imgList.push({ imgId: item.id, imgUrl: item.imgUrl, date });
    }

    setContents(imgList);
  }

  return (
    <Container>
      <Layout>
        <Title> 최근사진 </Title>
        <LayoutLatestPhoto>
          {
            contents && contents.length > 0 ?
              contents.map((content) => (
                <LayoutCatImgGroup key={content.imgUrl}>
                  <CatImgDiv src={content.imgUrl} alt="ArrowLeft" />
                  {content.date}
                </LayoutCatImgGroup>
              ))
              :
              <DishStatus>
                <div style={{ color: "#FF4081", fontSize: "0.8rem" }}>
                  <StatusImgDiv src={Face} alt="Face" />
                  아직 최근 사진이 없어요.</div>
              </DishStatus>
          }
        </LayoutLatestPhoto>
      </Layout>
{/*      <Layout>
        <Title> 밥그릇 상태 </Title>
        <DishStatusGroup>
          <DishStatus>
            {contents.length > 0 && (new Date(contents[0].date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) < 7 ?
              <div style={{ fontSize: "0.8rem" }}>
                <StatusImgDiv src={Smile} alt="smile" />
                최근 일주일간 고양이가 이용한 기록이 있어요.
              </div> :

              <div style={{ color: "#FF4081", fontSize: "0.8rem" }}>
                <StatusImgDiv src={Face} alt="Face" />
                최근 일주일간 고양이가 이용한 기록이 없어요.</div>}
          </DishStatus>
        </DishStatusGroup>
      </Layout>*/}
      <Layout>
        <Title> 신고 게시글 </Title>
        <StateInfoTable />
      </Layout>
    </Container>
  );
}

export default StateInfo;

const Container = styled.div`
  width: 100%;
  overflow: auto;
  background-color: ${(props) => props.theme.colors.lightPink};

  ::-webkit-scrollbar {
    display: none;
  }

  height: 85vh;
  padding-bottom: 60px;
`;

// 공통 틀
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 16px;
  gap: 24px;
`
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`


// 최근사진
const LayoutLatestPhoto = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  width: 100%;
  overflow: auto;
    ::-webkit-scrollbar {
    display: none;
  }
`

const LayoutCatImgGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;
  gap: 2px;
  font-family: "BMYEONSUNG";
`
const CatImgDiv = styled.img`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 6px;
  width: 180px;
  height: fit-content;
`;


// 밥그릇 상태
const DishStatusGroup = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const DishStatus = styled.div`
  width: 100%;
  font-family: "BMHANNAPro";
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;

  height: 48px;
  box-sizing: border-box;
  border: 1px solid #D9D9D9;
`
const StatusImgDiv = styled.img`
  // filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 6px;
  width: 24px;
  height: fit-content;
  margin-right:0.5rem;
`;


// 신고 게시글
