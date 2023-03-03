import { Spin } from 'antd';
import { LayoutFlex } from "./Layout/LayoutFlex";

export const Load = () => {
    return (
        <LayoutFlex justify={"center"} align={"center"} width={"100%"} height={"100%"}>
            <Spin />
        </LayoutFlex>
    );
}
export default Load;