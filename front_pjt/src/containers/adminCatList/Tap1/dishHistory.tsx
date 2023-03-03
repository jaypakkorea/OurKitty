import styled from "styled-components";
import { useEffect, useState } from "react";
import HistoryTable from "./HistoryTable";
import Pen from "../../../assets/icon/button/pen.png"
import DishHistoryAddModal from "../../../Component/modal/DishHistoryAddModal";
import { getHistories } from "apis/api/dishHistory";

interface DishHistory {
  "id": number,
  "dishId": number,
  "adminId": number,
  "adminName": string,
  "state": number,
  "content": string
  createdDate: string
}

function DishHistory(props: any) {
  const url = window.location.href.split("/");
  const dishId: number = Number(url[url.length - 1]);

  const [histories, setHistories] = useState<DishHistory[]>([]);
  const [historyAddModal, setHistoryAddModal] = useState<boolean>(false);

  const modalOpen = () => {
    setHistoryAddModal(true);
  }

  const modalClose = () => {
    setHistoryAddModal(false);
  }

  const addHandler = () => {
    modalClose();
  }

  const getHistoryData = async () => {
    const { data } = await getHistories(dishId);
    setHistories(data);
  };

  useEffect(() => {
    getHistoryData();
  }, [histories]);

  return (
    <Container>
      <FlexDiv>
        <MainTitle>관리 로그</MainTitle>
        <WriteButton onClick={modalOpen}>작성하기<WriteImg src={Pen} /></WriteButton>
      </FlexDiv>
      <HistoryTable histories={histories} />
      <DishHistoryAddModal modalOpen={historyAddModal} modalClose={modalClose} dishId={props.dishId} addHandler={addHandler} />
    </Container>
  );
}

export default DishHistory;

const Container = styled.div`
  width: 100%;
  /* display: flex; */
  //max-height: 50vh;
  overflow: auto;
  background-color: ${(props) => props.theme.colors.lightPink};

  ::-webkit-scrollbar {
    display: none;
  }
`;

const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const MainTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const WriteButton = styled.button`
  border: none;
  background: transparent;
  font-family: "BMYEONSUNG", serif !important;
`

const WriteImg = styled.img`
  margin-left: 0.5rem;
  width: 1.3rem;
`