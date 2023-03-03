import { LayoutFlex } from "Component/Layout/LayoutFlex";
import {
    faHeart as likeSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IotImages } from "../Store/Type/iotImagesType";
import IotModal from "containers/userHome/iotModal";
import Swal from "sweetalert2";

interface Props {
    key: number
    like: (iotId: number, isLike: boolean) => void
    iotData: IotImages,
    size?: string,
    width?: string,
};

function IotImageCard(iotData: Props) {
    const onLike = iotData.like
    let content = iotData.iotData
    let size = iotData.size
    let width = iotData.width

    const [isLike, setisLike] = useState(false)
    const [noticeModal, setNoticeModal] = useState<boolean>(false);

    const modalClose = () => {
        setNoticeModal(false);
    }

    const modalOpen = () => {
        setNoticeModal(true);
    }


    useEffect(() => {
        setisLike(content.isLike)
    }, [content.isLike])

    return (
        <LayoutFlex width={width ?? "32%"} gap={"2px"} direction={"column"}>
            {content.imgUrl ?
                <Sdiv >
                    <ImgDiv onClick={modalOpen} width={size ?? "95%"} src={content.imgUrl} alt="IotCat" />
                    <LikeButton back={isLike} onClick={() => {
                        if (localStorage.getItem('token')) {
                            onLike(content.id, content.isLike)
                            setisLike((prev) => !prev)
                        } else {
                            Swal.fire('로그인 후 사용해 주세요.', '', 'error');
                        }
                    }}>
                        <FontAwesomeIcon icon={likeSolid} style={{ cursor: 'pointer' }} />
                    </LikeButton>
                    <DateDiv>{content.createdDate.split('T')[0]} {content.createdDate.substr(11, 5)}</DateDiv>
                </Sdiv>
                : <></>

            }
            <IotModal modalOpen={noticeModal} modalClose={modalClose} data={content} />

        </LayoutFlex>
    )
}

export default IotImageCard;

const Sdiv = styled.div`
  position: relative;
`
const ImgDiv = styled.img`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 6px;
  width: ${props => props.width};
  max-height: 150px;
  margin: 0 0.5rem;
`;

const LikeButton = styled.div`
  color: ${({ back }: { back: boolean }) => (back === true ? 'red' : '#F4EDED')};
  margin-top: -2rem;
  position: absolute;
  margin-bottom: 0.5rem;
  margin-left: 75%;
  z-index: 10;
  font-size: 1.4rem;
`
const DateDiv = styled.div`
  margin-left: 5%;
  font-size: 0.5rem;
  margin-bottom: 0.5rem;
`
