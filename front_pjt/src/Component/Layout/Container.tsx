import { ReactNode } from 'react';
import styled from "styled-components";

interface Props {
    children: ReactNode;
    id?: string
};
function Container({ children, id }: Props) {
    return (
        <LayoutInfo id={id!}>
            {children}
        </LayoutInfo>
    );
};

export default Container;

const LayoutInfo = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
        display: none;
    }
    @media ${(props) => props.theme.mobile} {
    height: 100vh;
  }
`