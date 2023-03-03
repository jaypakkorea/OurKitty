import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Carousel, Checkbox, Modal } from 'antd';
import CatTutorial from 'assets/images/catTutorial.png'
import Together from 'assets/images/group.png'
import LastImage from 'assets/images/lastImage.png'
// import PhoneImage from 'assets/images/168.png'
import VoteImage from 'assets/images/vote.png'
import DeclineImage from 'assets/icon/decline2.svg'
import PhoneImage from 'assets/icon/datalook.svg'


interface PopUpViewProps {
    closePopUp: (selCheck: boolean) => void;
}


function Tutorial(props: PopUpViewProps) {

    const [selCheck, setSelCheck] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const onTutorial = () => {
        setSelCheck(!selCheck);

    };
    const onCloseModal = (): void => {
        props.closePopUp(selCheck);
        setIsModalOpen(false)
        localStorage.setItem('justClose', "true")
    };

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 770) {
                setShowButton(false);
            } else {
                setShowButton(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {showButton ?

                <></>
                :
                <SModal open={isModalOpen}
                    centered
                    closable={false}
                    footer={null}
                    style={modalStyle}
                >
                    <Carousel effect="fade">

                        <div style={modalContent}>
                            <div style={contentStyle}>
                                <div style={PContent}>
                                    <p>길고양이를 향한 <br />
                                        <span style={pointSpan}>무조건적인 혐오</span> 는<br />
                                        오히려 길고양이 개체수를 증가시켜요
                                    </p>
                                </div>
                                <StyledImg src={CatTutorial} alt="CatTutorial" />
                            </div>
                        </div>

                        <div style={modalContent}>
                            <div style={contentStyle}>
                                <div style={PContent}>
                                    <p>지역 주민 모두가 <br />
                                        <span style={pointSpan}>등록된 냥그릇</span> 에서만<br />
                                        고양이에게 밥을 주고
                                    </p>
                                </div>
                                <StyledImg src={Together} alt="CatTutorial" />
                            </div>
                        </div>
                        <div style={modalContent}>
                            <div style={contentStyle}>
                                <div style={PContent}>
                                    <p >
                                        <span style={pointSpan}> IoT</span>  급식소의 데이터를 활용해<br />
                                        고양이가 이용하는 시간대에 <span style={pointSpan}>
                                            <br />TNR</span>(포획, 중성화, 방생) 한다면
                                        <br />개체수는 획기적으로 줄어들거에요.
                                    </p>

                                </div>
                                <div style={{ border: "1rem solid white", margin: '2rem' }} />
                                <StyledImg src={DeclineImage} alt="CatTutorial" />
                            </div>
                        </div>
                        <div style={modalContent}>
                            <div style={contentStyle}>
                                <div style={PContent}>
                                    <p>  <span style={pointSpan}> IoT</span>  급식소를 통해<br />
                                        언제든 <span style={pointSpan}>위치, 급식소 상태,</span>  <br />
                                        이용하는 고양이를 볼 수 있고
                                    </p>

                                </div>
                                <StyledImg src={PhoneImage} alt="CatTutorial" />
                            </div>
                        </div>
                        <div style={modalContent}>
                            <div style={contentStyle}>
                                <div style={PContent}>
                                    <p>해당 냥그릇 위치에 대해 언제든 <br />
                                        <span style={pointSpan}>투표</span>와
                                        <span style={pointSpan}>커뮤니티 글</span>로 <br />
                                        의견을 남길 수도 있어요
                                    </p>
                                </div>
                                <StyledImg src={VoteImage} alt="CatTutorial" />
                            </div>
                        </div>


                        <div style={modalContent}>
                            <div style={contentStyle}>
                                <div style={PContent}>
                                    <p> 우리 동네 <span style={pointSpan}>길고양이</span>와 <br />
                                        <span style={pointSpan}>함께사는 삶</span><br />
                                        <span style={pointSpan}>냥그릇</span> 과 함께 만들어가요
                                    </p>
                                </div>
                                <StyledImg src={LastImage} alt="CatTutorial" />
                                <div style={lastcontentStyle}>
                                    <div style={marginForCheckbox} onClick={onTutorial}>
                                        오늘 하루 열지 않기
                                    </div>
                                    <Checkbox onChange={onTutorial} style={marginForCheckbox} />
                                    <span onClick={onCloseModal}>닫기</span>
                                </div>
                            </div>
                        </div>
                    </Carousel>

                </SModal>
            }
        </>
    );
}

export default Tutorial;


const modalStyle: React.CSSProperties = {
    height: '70vh',
    textAlign: 'center',
    width: '100%',
};


const modalContent: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const contentStyle: React.CSSProperties = {
    marginTop: '1rem',
    // paddingBottom : '1rem',
    textAlign: 'center',
    background: 'transparent',
    fontFamily: 'BMJUA',
    fontSize: '1rem',
    height: '63vh',
    letterSpacing: '0.13rem'
};

const pointSpan: React.CSSProperties = {
    marginTop: '1rem',
    // paddingBottom : '1rem',
    textAlign: 'center',
    background: 'transparent',
    fontFamily: 'BMJUA',
    fontSize: '1.8rem',
    height: '63vh',
    letterSpacing: '0.13rem'
};

const PContent: React.CSSProperties = {
    height: '15vh',
    lineHeight: '2rem',
    marginBottom: '1rem'
};


const StyledImg = styled.img`
    position: relative;
    margin-left: auto;
    margin-right: auto;
    height: 30vh;
    margin-top: 5vh;
`;


const lastcontentStyle: React.CSSProperties = {
    color: 'black',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'row',
    fontSize: '0.8rem',
    position: 'fixed',
    bottom: '0rem',
    left: '32vw',
    fontFamily: 'BMYEONSUNG',
};

const marginForCheckbox: React.CSSProperties = {
    marginRight: '1rem',
};

const SModal = styled(Modal)`
    .ant-modal-content{
    background-color: white;
    width: 100%;
    height: 100%;
    }
    .ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select{
    width: 100%;
    margin-left: 15%;
    height: 200px;
    overflow: hidden;
    }
    .ant-carousel .slick-dots li button::after {
    background : hotpink;
    margin : 0.2rem;
    }
    
`;

