import { FC } from 'react';
import styled from 'styled-components'


interface TitleProps {
    text?: string;
}


const Title: FC<TitleProps> = ({
    text = "text"
}) => (
    <TitleText>{text}</TitleText>
)


const TitleText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export default Title;