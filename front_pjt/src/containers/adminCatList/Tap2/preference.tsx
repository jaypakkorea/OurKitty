import { useEffect } from 'react'
import styled from 'styled-components'
import PreferenceChart from './preferenceChart';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { useDispatch, useSelector } from "react-redux";
import { fetchPreferenceList } from "../../../Store/preference-action";
import { Excel } from 'antd-table-saveas-excel';


interface DataType {
  dishName: string;
  key: number;
  name: string;
  reportsNum: string;
  text: string;
  day: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '아이디',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '상태',
    dataIndex: 'reportsNum',
    key: 'reportsNum',
    render: (text) => {
      if (!text) {
        text = '-';
      } else if (text === '반대') {
        return <NoTag>반대</NoTag>
      } else if (text === '찬성') {
        return <YesTag>찬성</YesTag>;
      } else if (text === '중립') {
        return <MidTag>중립</MidTag>;
      }
    },
    filters: [
      {
        text: '찬성',
        value: '찬성',
      },
      {
        text: '반대',
        value: '반대',
      },
      {
        text: '중립',
        value: '중립',
      },
    ],
    // @ts-ignore
    onFilter: (value: string, record) => record.reportsNum.indexOf(value) === 0,
  },
  {
    title: '내용',
    key: 'text',
    dataIndex: 'text',
  },
  {
    title: '작성일자',
    key: 'day',
    dataIndex: 'day',
    // sorter: {
    //   compare: (a, b) => new Date(a.day) - new Date(b.day),
    // },
    render: (day) => <>{day.split('T')[0]}</>,

  },
];

const columns1 = [
  {
    title: '번호',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: '냥그릇 이름',
    dataIndex: 'dishName',
    key: 'dishName',
  },
  {
    title: '아이디',
    dataIndex: 'name',
    key: 'name',

  },
  {
    title: '상태',
    dataIndex: 'reportsNum',
    key: 'reportsNum',
    filters: [
      {
        text: '찬성',
        value: '찬성',
      },
      {
        text: '반대',
        value: '반대',
      },
      {
        text: '중립',
        value: '중립',
      },
    ],
    // @ts-ignore
    onFilter: (value: string, record) => record.reportsNum.indexOf(value) === 0,
  },
  {
    title: '내용',
    key: 'text',
    dataIndex: 'text',
  },
  {
    title: '작성일자',
    key: 'day',
    dataIndex: 'day',
  },
];

function Preference() {
  const url = window.location.href.split("/");
  const dishId: number = Number(url[url.length - 1])

  const dispatch = useDispatch();

  // @ts-ignore
  const preferenceList = useSelector(state => state.preference.preferenceList);
  // @ts-ignore
  const isGettingPreferenceList = useSelector(state => state.preference.isGettingPreferenceList);


  useEffect(() => {
    // @ts-ignore
    dispatch(fetchPreferenceList(dishId))
  }, [dispatch])

  if (isGettingPreferenceList) {
    return (
      <div>로딩중 ...</div>
    )
  }

  const data: Array<DataType> = [];
  let key = 1;

  for (const preference of preferenceList) {
    data.push({
      key: key++,
      dishName: preference.dishName,
      name: preference.userName,
      reportsNum: (preference.preferenceResult === 1) ? '찬성' : (preference.preferenceResult === 0) ? '중립' : '반대',
      text: preference.reason,
      day: `${preference.updatingDate.split('T')[0]} ${preference.updatingDate.substr(11, 5)}`,
    })
  }

  const tempStyle = {
    marginRight: '1rem',
    background: '#62B6B7',
    color: 'white',
    borderColor: "white",
    fontWeight: 'bolder'
  }

  return (
    <Container>
      <PreferenceChart preferenceList={preferenceList} />

      <FlexDiv>
        <Title>등록된 의견들</Title>

        <ExcelButton style={tempStyle} onClick={() => {
          const excel = new Excel();
          excel
            .addSheet('test')
            .addColumns(columns1)
            .addDataSource(data)
            .saveAs('냥그릇_선호도.xlsx');
        }}>Excel</ExcelButton>

      </FlexDiv>


      <Table
        showSorterTooltip={false}
        dataSource={data}
        columns={columns}
      />
    </Container>
  );
}

export default Preference;

const Container = styled.div`
  width: 100%;
  height: 85vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 16px;
  gap: 24px;
  background-color: ${(props) => props.theme.colors.lightPink};

  ::-webkit-scrollbar {
    display: none;
  }
  .ant-table-wrapper{
    width: 100%;
  }
  & thead > tr:nth-child(1) > th {
    padding: 15px 5px;
    text-align: center;
    font-size: 0.8rem;
    background: ${(props) => props.theme.colors.white};
    border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
  }

  .ant-table-cell {
    font-size: 0.8rem;
    font-family: "BMJUA" !important;

    .ant-table-filter-column > div {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
    }

    ::before {
      background-color: transparent !important;
    }
  }

  .ant-table-filter-trigger-container {
    background: #fff;
  }

  .ant-table-filter-trigger:hover {
    background: #fff;
  }

  .ant-table-thead th.ant-table-column-has-sorters:hover,
  .ant-table-thead th.ant-table-column-sort {
    background: #fff;
  }

  td.ant-table-column-sort {
    background: #fff;
  }

  .ant-table-pagination-right {
    justify-content: center;
  }

  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link,
  .ant-pagination-item {
    border: none;
    background-color: ${(props) => props.theme.colors.lightPink};
  }

`;

const FlexDiv = styled.div`
    margin: 1rem 0.2rem 0;
    display: flex;
    width: 100%;
    justify-content: space-between; 
    font-size: 1.5rem;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.2rem;
`;


const YesTag = styled.div`
  background-color: ${(props) => props.theme.colors.hotPink};
  width: 55px;
  border-radius: 5px;
  text-align: center;
`;
const MidTag = styled.div`
  background-color: ${(props) => props.theme.colors.gray};
  width: 55px;
  border-radius: 5px;
  text-align: center;
`;
const NoTag = styled.div`
  background-color: ${(props) => props.theme.colors.lightblue};
  width: 55px;
  border-radius: 5px;
  text-align: center;
`;

const ExcelButton = styled.button`
  border: 0.1em solid ${(props) => props.theme.colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  font-size: 0.9rem;

  background: '#62B6B7';
  
  width: fit-content;

  font-weight: light;

  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  
`;