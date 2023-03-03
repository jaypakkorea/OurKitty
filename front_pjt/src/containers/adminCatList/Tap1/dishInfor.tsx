import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation, useNavigate } from "react-router-dom";
import DishHistory from "./dishHistory";
import { getDishData } from 'apis/api/dish';
import { Dish } from 'Store/Type/DishType';

function DishInfor() {
  const { state } = useLocation();
  const [dish, setDish] = useState<Dish>();
  const navigate = useNavigate();

  const init = async () => {
    let dishId = 1;
    if (!state || !state.id) {
      const url = window.location.href.split("/");
      dishId = Number(url[url.length - 1]);
    } else {
      dishId = state.id;
    }

    const data: Dish = await getDishData(dishId);
    setDish(data);
  }

  const handleModifyBtn = () => {
    navigate(`/catadmin/catlist/map/edit/${state.id}`, { state });
  }

  useEffect(() => {
    init().then();
  }, [])

  return (
    <Container>
      <ImgDiv src={dish?.dishImg} alt="냥그릇사진" />
      <FlexDiv>
        <MainTitle>{dish?.dishName}</MainTitle>
        <ButtonDiv>
          <EditButton onClick={handleModifyBtn}>
            수정
          </EditButton>
          <Link to={`/catadmin/catlist/${dish?.id}/datas`}>
            <ExcelButton>
              통계 Data
            </ExcelButton>
          </Link>
        </ButtonDiv>
      </FlexDiv>
      <SuvTitle>{dish?.loadAddress}</SuvTitle>
      <MainTitle>담당자</MainTitle>
      <SuvTitle>{dish && dish.adminGroup && dish.adminGroup.groupName}</SuvTitle>
      <DishHistory dishId={dish?.id} />
      <MainTitle>비고</MainTitle>
      <DetailDiv>
        {dish?.otherNote}
      </DetailDiv>
    </Container>
  );
}

export default DishInfor;

const Container = styled.div`
  width: 100%;
  /* display: flex; */
  padding: 1rem;
  height: 85vh;
  padding-bottom: 60px;
  overflow: auto;
  background-color: ${(props) => props.theme.colors.lightPink};

  ::-webkit-scrollbar {
    display: none;
  }

`;

const ImgDiv = styled.img`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 6px;
  width: 100%;
  height: fit-content;
  margin-bottom: 2rem;
`;

const MainTitle = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
`;

const SuvTitle = styled.div`
  margin: 1rem 0 2rem 1rem;
  font-family: "BMYEONSUNG";
`;

const DetailDiv = styled.div`
  width: 100%;
  height: 200px;
  margin: 1rem 0;
  border: 1.5px solid gray;
  border-radius: 10px;
  padding: 1rem;
`;

const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

`;
const ButtonDiv = styled.div`
  display: flex;
  margin: auto 0;
`;

const EditButton = styled.button`
  width: 40px;
  height: 2em;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.lightOrange};
  border: 0.1em solid ${(props) => props.theme.colors.lightOrange};
  border-radius: 10px;
  font-size: 0.9em;
  margin-right: 0.9em;

  &:hover,
  &:focus,
  &:active {
    font-weight: 600;
    border: 0.1em solid ${(props) => props.theme.colors.lightOrange};
    color: ${(props) => props.theme.colors.lightOrange};
    box-shadow: none;
  }
`;

const ExcelButton = styled.button`
  width: 80px;
  height: 2em;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.green};
  border: 0.1em solid ${(props) => props.theme.colors.green};
  border-radius: 10px;
  font-size: 0.9em;

  &:hover,
  &:focus,
  &:active {
    font-weight: 600;
    border: 0.1em solid ${(props) => props.theme.colors.green};
    color: ${(props) => props.theme.colors.green};
    box-shadow: none;
  }
`;