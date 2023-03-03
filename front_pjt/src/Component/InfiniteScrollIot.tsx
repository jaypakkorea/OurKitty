// @flow
import InfiniteScroll from 'react-infinite-scroll-component';
import Load from "./Load";
import useSelectorTyped, { useAppDispatch } from "../Store";
import Container from './Layout/Container';
import { useEffect } from "react";
import { fetchIotImageData } from "../Store/iot-actions";
import { IotImages } from "../Store/Type/iotImagesType";
import IotImageCard from "./iotImageCard";
import { LikeIot } from "../apis/api/iot";
import { iotActions } from "../Store/iot-slice";
import { NoImage } from "./NoImage";

interface Props {
    dishId: number,
    width: string,
};

export function InfiniteScrollIot(props: Props) {
    const dishId = props.dishId
    const width = props.width
    const dispatch = useAppDispatch();

    const { images, imagesSlice } = useSelectorTyped(state => ({
        images: state.iot.images,
        imagesSlice: state.iot.imagesSlice,
    }));
    const page = imagesSlice.number;

    const onChangeLike = (iotId: number) => {
        // 좋아요 안한 상태
        LikeIot(iotId).then(() => dispatch(iotActions.isImagesLikeOn(iotId)));
    };

    useEffect(() => {
        dispatch(fetchIotImageData(dishId, page));
    }, [dishId, dispatch])

    const nextSlice = () => {
        dispatch(fetchIotImageData(dishId, page + 1));
    }


    return (
        <Container id={"iotImages"}>
            <InfiniteScroll
                dataLength={images.length} //반복되는 컴포넌트의 개수
                next={nextSlice} //스크롤이 화면 맨 아래에 닿았을때 부르는 함수
                hasMore={!imagesSlice.last} ///추가 데이터가 있는지 여부
                loader={<Load />} //로딩바
                style={
                    {
                        display: "flex",
                        flexWrap: "wrap",
                        margin: "0 auto",
                    }
                }
                scrollableTarget={"iotImages"}
            >
                {(imagesSlice.empty) ?
                    <NoImage />
                    :
                    images.map((iotData: IotImages, index) => (
                        <IotImageCard key={index} iotData={iotData} like={onChangeLike} width={width} />
                    ))}
            </InfiniteScroll>
        </Container>
    );
};
