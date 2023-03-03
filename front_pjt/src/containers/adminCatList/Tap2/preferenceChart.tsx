import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Preference } from "../../../Store/Type/preference";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    preferenceList: Array<Preference>;
};

export const PreferenceChart = (props: Props) => {

    const preferenceList = props.preferenceList

    let upVote = 0
    let neutralVote = 0
    let downVote = 0

    for (const preference of preferenceList) {
        if (preference.preferenceResult === 1) upVote++
        else if (preference.preferenceResult === 0) neutralVote++
        else downVote++
    }

    const data = {
        labels: [
            '찬성',
            '중립',
            '반대'
        ],
        datasets: [{
            data: [upVote, neutralVote, downVote],
            backgroundColor: [
                '#FF4081',
                '#D9D9D9',
                '#BEEDEF'
            ],
            borderColor: "#FFFFFF",
            hoverOffset: 8,
            // options: {
            //   plugins: {
            //     legend: {
            //       position: 'right',
            //     },
            //   }
            // }
        }]
    }

    if (preferenceList.length === 0) {
        return (<div>데이터가 없습니다..</div>)
    }

    return (
        <Container>
            <Chart>
                <Doughnut data={data} />
            </Chart>
            <DetailRight>
                {`투표 수 : ${preferenceList.length}명`}
                <DetailSub>
                    {`업데이트 : ${preferenceList[preferenceList.length - 1].updatingDate.split('T')[0]} ${preferenceList[preferenceList.length - 1].updatingDate.substr(11, 5)}`}
                </DetailSub>
            </DetailRight>
        </Container>
    );
}

// PreferenceChart.propTypes = {
//     preferenceList: Array<Preference>
// };

export default PreferenceChart;

const Container = styled.div`
  width: 100%;
`;

const Chart = styled.div`
  width: 60%;
  margin: 10px auto;
`;

const DetailRight = styled.div`
  text-align: right;
`;

const DetailSub = styled.div`
  font-size: 0.8rem;
`;
