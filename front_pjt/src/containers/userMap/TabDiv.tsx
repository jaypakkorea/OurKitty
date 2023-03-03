import styled from "styled-components";
import { NavLink } from 'react-router-dom'

function TabDiv(props: any) {
  const dishId = props.dishId

  return (
    <FlexDiv>
      <MenuDiv to={`/map/dish/${dishId}/1`}>
        냥그릇 정보
      </MenuDiv>
      <MenuDiv to={`/map/dish/${dishId}/2`}>
        냥그릇 고객
      </MenuDiv>
      <MenuDiv to={`/map/dish/${dishId}/3`}>
        커뮤니티
      </MenuDiv>
    </FlexDiv>
  );
}
export default TabDiv;

const FlexDiv = styled.div`
  display:flex;
  justify-content: space-between;
  width: 100%;
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }
`;
const MenuDiv = styled(NavLink)`
width: 33.3%;
height: 50px;
line-height: 50px;
text-align: center;
border: 1px solid ${(props) => props.theme.colors.pink};
background: ${(props) => props.theme.colors.lightPink};
&.active{
  background:${(props) => props.theme.colors.pink};
  font-size: 1.1rem;
}
:hover {
    color:${(props) => props.theme.colors.hotPink};
}
`;

