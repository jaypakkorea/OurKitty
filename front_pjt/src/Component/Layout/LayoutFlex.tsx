// @flow
import styled from "styled-components";
import { ReactNode } from "react";


type FlexDirection = "row" | "column"
type FlexJustify = "flex-end" | "flex-start" | "center" | "space-between"

interface Props {
    children: ReactNode;
    direction?: FlexDirection;
    justify?: FlexJustify;
    align?: FlexJustify;
    gap?: string;
    width?: string;
    height?: string;
    flexWrap?: string;
    overFlow?: string;
    marginBottom?: string;
};

export function LayoutFlex(props: Props) {
    return (
        <LayoutInfo gap={props.gap ?? "0px"} direction={props.direction ?? "row"}
            justify={props.justify ?? "flex-start"} align={props.justify ?? "flex-start"}
            width={props.width ?? "auto"} flexWrap={props.flexWrap ?? ""} marginBottom={props.marginBottom ?? '0px'}>
            {props.children}
        </LayoutInfo>
    );
};

const LayoutInfo = styled.div<Props>`
  display: flex;
  width: ${props => props.width};
  gap: ${props => props.gap};
  flex-direction: ${props => props.direction};
  align-items:  ${props => props.direction};
  justify-content: ${props => props.justify};
  flex-wrap: ${props => props.flexWrap};
  overflow: ${props => props.overFlow};
  margin-bottom: ${props => props.marginBottom};
`