import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


interface SliderProps {
  current: number;
}

const SliderBar = ({ current }: SliderProps): JSX.Element => {

  const url = window.location.href.split("/");
  const dishId: number = Number(url[url.length - 2])
  const [foodWeightChangeDate, setFoodWeightChangeDate] = useState('')

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://ourkitty.site/api/dishes/${dishId}`,

    })
      .then(res => {
        setFoodWeightChangeDate(res.data.foodWeightChangeDate)

      })
  }, [])

  const ratio = Math.round(100 - (current / 100) * 100);
  return (
    <SideBarCSS>
      {/* <UpdateDiv>업데이트 : {foodWeightChangeDate.split('T')[0]}  {foodWeightChangeDate.split('T')[1].slice(0,5)}</UpdateDiv> */}
      <UpdateDiv>{foodWeightChangeDate}</UpdateDiv>
      <StyledTrack>
        <StyledRange width={ratio} />
      </StyledTrack>
      <UpdateDivFinal>{ratio}%가 남았어요</UpdateDivFinal>
    </SideBarCSS>
  );
};




const StyledTrack = styled.div`
  width: 100%;
  border: 1px solid gray;
  border-radius: 5px;
  text-align: end;
  background: #d7d6d6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0 0 0 0;
`;

const SideBarCSS = styled.div`
  width: 100%;
`

const UpdateDiv = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  text-align: end;
  font-family: "BMYEONSUNG";
  right: 0;
`;

const UpdateDivFinal = styled.div`
  text-align: end;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  right: 0;
`;



const StyledRange = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}%`};
  height: 50px;
  border-right: 1px solid gray;
  border-radius: 5px;
  background: linear-gradient(to right, ${(props) => props.theme.colors.hotPink}, ${(props) => props.theme.colors.pink});
`;

export default SliderBar;