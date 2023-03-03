import { useEffect, useState } from 'react'
import styled from 'styled-components'
// import Header from "../../Component/Header";
import { GetHospitalList } from 'apis/api/hospital';
import { Hospital } from 'Store/Type/hospitalType';
import HospitalDetailTable from './HospitalTable';

function HospitalList() {

    const [hospitalList, setHospitalList] = useState<Hospital[]>([]);


    useEffect(() => {
        const tableList: Hospital[] = [];

        GetHospitalList()
            .then(function (response: any) {
                response.forEach((hospital: any) => {
                    tableList.push({
                        hospitalId: hospital.id,
                        groupId: hospital.groupId,
                        name: hospital.hospitalName,
                        address: hospital.address,
                        lat: hospital.lat,
                        lon: hospital.lon,
                        phone: hospital.hospitalPhone,
                        state: hospital.hospitalState === 1
                    });
                });

                setHospitalList(tableList);
            });
    }, [])


    return (
        <Container>
            <HospitalDetailTable hospitals={hospitalList} />
        </Container>
    );
}

export default HospitalList;

const Container = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 2rem;
`