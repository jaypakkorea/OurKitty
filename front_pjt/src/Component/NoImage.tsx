// @flow
import styled from "styled-components";
import MovingCat from 'assets/images/original.gif'

interface Props {
  width?: string;
  height?: string;
};

export function NoImage(props: Props) {
  return (
    <NoDataText>
      <NoDataimg width={props.width ?? "300px"} height={props.height ?? "auto"} src={MovingCat} alt='사진없음' />
      <Exception>사진이 없어요~</Exception>
    </NoDataText>
  );
};

const Exception = styled.div`
      font-size: 2rem;
      text-align: center;
      margin:auto;
      font-family: BMJUA;
      `
const NoDataimg = styled.img`
  width: ${props => props.width};
  height: ${props => props.height};
  margin: 0 auto;

`
const NoDataText = styled.div`
width: 100%;
display: flex;
flex-direction: column;
`