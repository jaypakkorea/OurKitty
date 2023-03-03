import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DatePicker } from 'antd';
import ApexCharts from "react-apexcharts";
import dayjs from 'dayjs';
import { GetDishWeightData } from 'apis/api/dish';

interface DataType {
  x: number;
  y: number;
}

function WeightData() {
  const url = window.location.href.split("/");
  const dishId: number = Number(url[url.length - 2]);
  const [selectDate, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    getData(selectDate);
  }, []);

  const getData = (date: string) => {

    GetDishWeightData(dishId, date).then(function (response: any) {
      addData(date, response);
    })
      .catch(function (error: any) {
        console.error(error);

        const nowTime = new Date();

        const list: DataType[] = [];
        for (var i = 0; i < 60; i++) {
          list.push({ x: nowTime.getTime() + 32400000 + i * 600000, y: i });
        }

        setData(list);
      });
  }

  const addData = (date: string, list: any) => {
    const data1: DataType[] = [];

    list.forEach((item: any) => {
      const nowTime = new Date(`${date} ${item.x}`).getTime() + 32400000;

      data1.push({ x: nowTime, y: item.y });
    });

    setData(data1);

  }

  const updateDate = (value: any, dateString: string) => {
    if (dateString !== null && dateString !== "") {

      setDate(dateString);
      getData(dateString);
    }
  }

  return (
    <Container>
      <Header>
        <DatePicker size="middle" defaultValue={dayjs(selectDate, 'YYYY-MM-DD')} onChange={updateDate} />
        <SubDiv>y 축 : 사료 무게 (kg) </SubDiv>
      </Header>

      <ApexCharts
        height={600}
        options={{
          chart: {
            type: 'line',
            zoom: {
              enabled: false
            },
            toolbar: {
              export: {
                csv: {
                  dateFormatter(timestamp: number) {
                    var a = new Date(timestamp).toISOString();

                    return a.split("T")[0] + " " + a.substr(11, 5);
                  }
                }
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          colors: ["#FF4081"],
          title: {
            // text: selectDate,
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          yaxis: {
            min: 0,
            max: 1,
            tickAmount: 5,
            labels: {
              formatter: function (value: number) {
                return value.toFixed(2);
              }
            }
          },
          xaxis: {
            type: 'datetime',
            tickAmount: 6,
            //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            labels: {
              datetimeFormatter: {
                year: 'yyyy',
                month: 'MMM \'yy',
                day: 'dd MMM',
                hour: 'HH:mm'
              }
            }
          },
          tooltip: {
            x: { format: 'hh:mm' }
          }
        }}
        series={[{
          name: "냥그릇 사료량",
          data: data
        }]}
        type="line" />
    </Container>
  );
}
export default WeightData;
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

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around; 
  margin-bottom: 1rem;
`;

const SubDiv = styled.div`
  margin-left: 1rem;
  margin-top: 0.3rem;
`;

