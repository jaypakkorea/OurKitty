import { LayoutFlex } from "Component/Layout/LayoutFlex";
import { useState } from "react";
import styled from "styled-components";
import { IotImages } from "../Store/Type/iotImagesType";
import IotModal from "containers/userHome/iotModal";

interface Props {
  key: number
  iotData: IotImages,
  size?: string,
  width?: string,
};

function AdminIotImageCard(iotData: Props) {
  let content = iotData.iotData
  let size = iotData.size
  let width = iotData.width

  const [noticeModal, setNoticeModal] = useState<boolean>(false);

  const modalClose = () => {
    setNoticeModal(false);
  }

  const modalOpen = () => {
    setNoticeModal(true);
  }


  return (
    <LayoutFlex width={width ?? "32%"} gap={"2px"} direction={"column"}>
      {content.imgUrl ?
        <Sdiv >
          <ImgDiv onClick={modalOpen} width={size ?? "95%"} src={content.imgUrl} alt="IotCat" />
          <DateDiv>{content.createdDate.split('T')[0]} {content.createdDate.substr(11, 5)}</DateDiv>
        </Sdiv>
        : <></>

      }
      <IotModal modalOpen={noticeModal} modalClose={modalClose} data={content} />

    </LayoutFlex>
  )
}

export default AdminIotImageCard;

const Sdiv = styled.div`
  position: relative;
`
const ImgDiv = styled.img`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 6px;
  width: ${props => props.width};
  height: 100px;
  margin: 0 0.5rem;
`;

const DateDiv = styled.div`
  margin-left: 5%;
  font-size: 0.5rem;
  margin-bottom: 0.5rem;
`
