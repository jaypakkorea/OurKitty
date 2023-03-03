import styled from 'styled-components'
import { useEffect, useState } from 'react';
import ApexCharts from "react-apexcharts";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { GetDishVisitData } from "apis/api/dish";
import VisitDetailModal from 'Component/modal/VisitDetailModal';

interface ArrayType {
    name: string;
    data: DataType[];
}

interface ImgType {
    imgUrl: string;
    createdDate: string;
}


interface DataType {
    x: string;
    y: number;
    imgs: ImgType[];
}

function VisiteData() {
    const url = window.location.href.split("/");

    const dishId: number = Number(url[url.length - 2]);
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const [selectDate, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [selectData, setSelectData] = useState<DataType>();

    const [series, setSeries] = useState<ArrayType[]>([]);
    const [time, setTime] = useState<string>();


    useEffect(() => {


        GetDishVisitData(dishId, selectDate).then(function (response: any) {
            addSeries(response);
        })
            .catch(function (error: any) {
            });

    }, []);

    const updateDate = (value: any, dateString: string) => {
        setDate(dateString);

        GetDishVisitData(dishId, dateString).then(function (response: any) {
            addSeries(response);
        })
            .catch(function (error: any) {
                //Swal.fire("정보를 읽어오는 도중 오류가 발생했습니다.",'','error');
            });
    }

    const addSeries = (list: any) => {
        const series1: ArrayType[] = [];

        list.forEach((item: any) => {

            series1.push({ name: item.name, data: item.data.slice() });
        });

        setSeries(series1);

    }

    const handleDetailModalOn = () => {
        setDetailModalOpen(true);
    }

    const handleDetailModalOff = () => {
        setDetailModalOpen(false);
    }


    return (
        <Container>
            <DatePicker size="middle" defaultValue={dayjs(selectDate, 'YYYY-MM-DD')} onChange={updateDate} />
            <ApexCharts
                height={740}
                series={series}

                options={{
                    chart: {
                        type: "heatmap",
                        width: "100%",
                        events: {
                            click: function (event, chartContext, config) {
                                var seriesIndex = parseInt(event.target.getAttribute("i"));
                                var dataPointIndex = parseInt(event.target.getAttribute("j"));

                                setTime(config.globals.seriesNames[seriesIndex]);
                                setSelectData(config.globals.initialSeries[seriesIndex].data[dataPointIndex]);
                                handleDetailModalOn();

                            }
                        },
                        toolbar: {
                            show: true,
                            tools: {
                                download: true,
                                selection: false,
                                zoom: false,
                                zoomin: false,
                                zoomout: false,
                                pan: false,
                                reset: false
                            },
                        }
                    },
                    plotOptions: {
                        heatmap: {
                            colorScale: {
                                ranges: [
                                    {
                                        from: -1,
                                        to: 2,
                                        color: "#FCF2F6",
                                        name: "0~2회"
                                    },
                                    {
                                        from: 3,
                                        to: 5,
                                        color: "#FFC2D7",
                                        name: "3~5회"
                                    },
                                    {
                                        from: 6,
                                        to: 9,
                                        color: "#FD94B7",
                                        name: "6~9회"
                                    },
                                    {
                                        from: 10,
                                        to: 100,
                                        color: "#FF4081",
                                        name: "10회 이상"
                                    }
                                ]
                            }
                        }
                    },
                    dataLabels: { enabled: false },
                    xaxis: {
                        labels: {
                            formatter: (value: string) => {
                                return value.substring(5,).replace("-", "/")
                            },
                            show: true,
                            trim: true,
                            style: {
                                fontSize: "12px",
                                cssClass: "apexcharts-xaxis-label",
                                fontWeight: 600
                            },
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    yaxis: {
                        reversed: true,
                    },
                }}
                type="heatmap" />
            <VisitDetailModal data={selectData} time={time} modalOpen={detailModalOpen}
                handleModalOff={handleDetailModalOff}></VisitDetailModal>
        </Container>
    );
}

export default VisiteData;
const Container = styled.div`
  width: 100%;
  padding: 1rem;
  height: 100%;
  padding-bottom: 60px;
  overflow: auto;
  background-color: ${(props) => props.theme.colors.lightPink};

  ::-webkit-scrollbar {
    display: none;
  }

`;