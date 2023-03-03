import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from "Component/Layout/Layout";
import Container from 'Component/Layout/Container';
import { NoticeCard } from './NoticeCard';
import Load from "../../Component/Load";
import { getNoticeList } from "../../apis/api/notice";


function Community() {
  const [loading, setLoading] = useState(true)
  const [notices, setNotices] = useState([])

  useEffect(() => {
    getNoticeList()
      .then(data => {
        setNotices(data.content)
        setLoading(false)
      })
      .catch(err => {
        alert(err)
      });
  }, [])

  return (
    <Container>
      <Layout>
        <Title>Happy Together</Title>
        {loading ? <Load /> :
          notices.map((notice: any, index) => (
            <NoticeCard key={index} notice={notice} />
          ))}
      </Layout>
    </Container>
  );
}

export default Community;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`
