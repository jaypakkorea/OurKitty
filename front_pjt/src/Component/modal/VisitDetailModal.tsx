import styled from 'styled-components';
import { Modal } from 'antd';
import { LayoutFlex } from "Component/Layout/LayoutFlex";
import { NoImage } from "Component/NoImage";

interface ImgType {
  imgUrl: string;
  createdDate: string;
}


function VisitDetailModal(props: any) {
  const { data, time, modalOpen, handleModalOff } = props;


  return <SModal
    open={modalOpen}
    centered
    footer={null}
    onCancel={handleModalOff}
    closable={true}>

    <TitleDiv>
      {data !== undefined ? <CardTitle>{data.x} &nbsp; {time} &nbsp; {data.y} 장</CardTitle> : <></>}
    </TitleDiv>
    <Layout>
      <CardDiv>
        {data === undefined ? <NoImage /> :
          data.imgs.length !== 0 ?
            (data.imgs.map((img: ImgType) => (
              <LayoutFlex width={"50%"} direction={"column"}>
                <ImgDiv key={img.imgUrl} width={"95%"} src={img.imgUrl} alt="IotCat" />
                <DateDiv>{img.createdDate.split('T')[0]} {img.createdDate.substr(11, 5)}</DateDiv>
              </LayoutFlex>
            )))
            : <NoImage />
        }
      </CardDiv>
    </Layout>
  </SModal>
}
export default VisitDetailModal;

const SModal = styled(Modal)`
.ant-modal-content{
  background-color: ${(props) => props.theme.colors.lightPink};
  padding: 2rem 0;
  height: 70vh;
  width: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
        display: none;
    }
}


& thead > tr:nth-child(1) > th {
  /* display: none; */
    padding: 10px 5px;
    text-align: center;
    font-size: 0.8rem;
    background: ${(props) => props.theme.colors.white};
    border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
  }

`;

const TitleDiv = styled.div`
  margin-left: 1rem;
`

const CardTitle = styled.div`
font-size: 1.2rem;
font-family: "BMJUA";
margin-bottom: 0.2rem;
`;

const CardDiv = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
margin: 0 auto;
height: 55vh;
overflow-y: scroll;
::-webkit-scrollbar {
  width: 10px;  /* 스크롤바의 너비 */
}
::-webkit-scrollbar-thumb {
  height: 30%; /* 스크롤바의 길이 */
  background: #B2B2B2; /* 스크롤바의 색상 */
  
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  background: rgba(234, 234, 234, .1);  /*스크롤바 뒷 배경 색상*/
}

`

const ImgDiv = styled.img`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 6px;
  width: ${props => props.width};
  //height: 100px;
  margin: 0.5rem 0.5rem;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 16px;
  gap: 24px;
  width: 100%;
  padding-bottom: 40px;
  overflow: auto;
  background-color: ${(props) => props.theme.colors.lightPink};
  ::-webkit-scrollbar {
      display: none;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding-bottom: 220px;

  }
`;

const DateDiv = styled.div`
margin-left: 5%;
font-size: 0.7rem;
margin-bottom: 0.5rem;
font-family: "BMJUA";
`
