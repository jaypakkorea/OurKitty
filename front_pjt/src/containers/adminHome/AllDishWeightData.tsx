import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DatePicker, Select } from 'antd';
import Charts from "react-apexcharts";
import dayjs from 'dayjs';
import { GetAllDishWeightData, GetDishWeightData } from 'apis/api/dish';


interface DishType {
  id: number;
  dishName: string;
}

interface DataType {
  x: number;
  y: number;
}

interface SeriesType {
  name: string,
  data: DataType[]
}

const { Option } = Select;

function AllDishWeightData() {
  const [allData, setAllData] = useState<SeriesType[]>([]);
  const [selectedData, setSelectedData] = useState<SeriesType[]>([]);

  const [dishes, setDishes] = useState<DishType[]>([]);

  const [selectDate, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const [selectDishes, setSelectDishes] = useState<string[]>([]);

  useEffect(() => {

    getAllDishData(selectDate);


  }, [selectDate]);

  useEffect(() => {
    var seriesList: SeriesType[] = [];
    setSelectDishes(selectDishes);

    allData.forEach((item: SeriesType) => {
      if (selectDishes.includes(item.name)) {
        seriesList.push(item);
      }
    });
    setSelectedData(seriesList);

  }, [allData]);

  const getAllDishData = (selectDate: string) => {
    var nameList: DishType[] = [];
    var seriesList: SeriesType[] = [];

    GetAllDishWeightData(selectDate).then(function (response: any) {

      response.forEach((item: any) => {
        nameList.push({ id: item.dishId, dishName: item.name });
        seriesList.push(addData(item.name, selectDate, item.data));
      })

      setDishes(nameList);
      setAllData(seriesList);
    });
  }

  const addData = (dishName: string, date: string, list: any) => {
    const data1: DataType[] = [];

    list.forEach((item: any) => {
      const nowTime = new Date(`${date} ${item.x}`).getTime() + 32400000;

      data1.push({ x: nowTime, y: item.y });
    });
    const seriesData: SeriesType = { name: dishName, data: data1 };

    return seriesData;
  }

  const updateDate = (value: any, dateString: string) => {
    if (dateString !== null && dateString !== "") {

      setDate(dateString);
    }
  }

  const handleChange = (value: string[]) => {
    var seriesList: SeriesType[] = [];
    setSelectDishes(value);

    allData.forEach((item: SeriesType) => {
      if (value.includes(item.name)) {
        seriesList.push(item);
      }
    });
    setSelectedData(seriesList);
  };

  return (
    <Container>
      <Header>
        <DatePicker size="middle" defaultValue={dayjs(selectDate, 'YYYY-MM-DD')} onChange={updateDate} />
        <SubDiv>y 축 : 사료 무게 (kg) </SubDiv>
      </Header>
      <Select mode="multiple"
        maxTagCount={2}
        style={{ width: '100%' }}
        placeholder="냥그릇 선택"
        onChange={handleChange}
        optionLabelProp="label">

        {dishes.map((dish) => <Option value={dish.dishName} label={dish.dishName} key={dish.id}>
          {dish.dishName}
        </Option>)}
      </Select>

      <Charts
        height={600}
        options={{
          chart: {
            id: 'chart',
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
            curve: 'smooth',
            width: 3,
          },
          //colors: ["#FF4081"],
          title: {
            //text: selectDate,
            align: 'left'
          },
          grid: {
            row: {
              //colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
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
          },
          legend: {
            show: false,
          }
        }}
        series={selectedData}
        type="line" />
    </Container>
  );
}
export default AllDishWeightData;


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

    .ant-select-selection--multiple
  {
   white-space: nowrap;
   height: 30px;
   overflow: auto
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
