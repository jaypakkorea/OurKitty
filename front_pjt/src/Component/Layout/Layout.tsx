import React, { ReactNode } from 'react';
import styled from "styled-components";

interface Props {
  children: ReactNode;
};
function Layout({ children }: Props) {
  return (
    <LayoutInfo>
      {children}
    </LayoutInfo>
  );
};

export default Layout;

export const LayoutInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 16px;
  gap: 12px;
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  overflow: auto;
  background-color: ${(props) => props.theme.colors.lightPink};
  ::-webkit-scrollbar {
      display: none;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
    height: 100vh;
  }
`;