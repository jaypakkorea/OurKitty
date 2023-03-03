import { Excel } from 'antd-table-saveas-excel';
import { GetAllDishPreferenceList } from 'apis/api/preference';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

interface DataType {
    dishId: number;
    dishName: string;
    key: number;
    name: string;
    state: string;
    reason: string;
    date: string;
}

const columns1 = [
    {
        title: '냥그릇 id',
        dataIndex: 'dishId',
        key: 'dishId',
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
        dataIndex: 'state',
        key: 'state',
    },
    {
        title: '내용',
        key: 'reason',
        dataIndex: 'reason',
    },
    {
        title: '작성일자',
        key: 'date',
        dataIndex: 'date',
    },
];

function AdminAllDishPreference() {
    const [data, setData] = useState<DataType[]>([]);

    useEffect(() => {
        const list: DataType[] = [];

        GetAllDishPreferenceList()
            .then((response: any) => {
                response.forEach((item: any) => {
                    let updateDate = item.updatingDate != null ? item.updatingDate : item.writingDate;
                    list.push({
                        dishId: item.dishId,
                        dishName: item.dishName,
                        key: item.preferenceId,
                        name: item.userName,
                        state: item.dishId == null ? '' : ((item.preferenceResult === 1) ? '찬성' : (item.preferenceResult === 0) ? '중립' : '반대'),
                        reason: item.reason,
                        date: updateDate !== null ? `${updateDate.split('T')[0]} ${updateDate.substr(11, 5)}` : updateDate
                    });
                });
            })
            .catch(() => {
                Swal.fire("데이터를 읽어오는 도중 에러가 났습니다.", '', 'error');
                // alert("문제 발생");
            })
        setData(list);

    }, []);



    const getPreferenceList = () => {
        const excel = new Excel();

        excel
            .addSheet('test')
            .addColumns(columns1)
            .addDataSource(data)
            .saveAs('냥그릇_선호도.xlsx');
    }

    return (
        <ExcelButton onClick={getPreferenceList}>냥그릇 선호도 Excel</ExcelButton>
    )

}

export default AdminAllDishPreference;

const ExcelButton = styled.button`
  border: 0.1em solid ${(props) => props.theme.colors.green};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;

  background-color: white;
  
  width: fit-content;

  color: ${(props) => props.theme.colors.green};

  font-weight: bold;
  
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  
  margin-right: 1rem;

  &:hover,
  &:focus,
  &:active {
    font-weight: 600;
    border: 0.1em solid ${(props) => props.theme.colors.green};
    color: ${(props) => props.theme.colors.green};
    box-shadow: none;
  }
`;