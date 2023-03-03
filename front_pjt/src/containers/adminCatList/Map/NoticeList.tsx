import styled from "styled-components";
import NoticeTable from "./NoticeTable";
import { authAdminInstance } from "../../../apis/utils/instance"
import { useEffect, useState } from "react";


export interface Notice {
    noticeId: number,
    adminName: string,
    content: string,
    noticeImgs: string[],
    createdAt: string
}

const NoticeList = () => {

    const [notices, setNotices] = useState<Notice[]>([]);
    const [load, setLoad] = useState<boolean>(false);

    const reLoad = () => {
        setLoad(!load);
    }

    useEffect(() => {
        authAdminInstance.get("/notices/admin-groups").then(res => setNotices(res.data)).catch(error => console.log(error));
    }, [load])

    return (
        <Container>
            <NoticeTable notices={notices} reLoad={reLoad} />
        </Container>
    )
}

export default NoticeList;

const Container = styled.div`
    display: flex;
    justify-content: center;
  
    margin-top: 2rem;
`

