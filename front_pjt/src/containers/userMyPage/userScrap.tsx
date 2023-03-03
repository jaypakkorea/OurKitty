import { useEffect } from 'react'
import Container from 'Component/Layout/Container';
import Layout from "Component/Layout/Layout";
import Header from 'Component/Header';
import { useDispatch } from 'react-redux';
import { fetchCommunityScrapList } from "../../Store/community-actions";
import { InfiniteScrollCommunity } from "../../Component/InfiniteScrollCommunity";

function UserScrap() {
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchCommunityScrapList());
    }, [dispatch])


    return (
        <Container>
            <Header />
            <Layout>
                <InfiniteScrollCommunity type={"Scrap"} />
            </Layout>
        </Container>
    );
}

export default UserScrap;
