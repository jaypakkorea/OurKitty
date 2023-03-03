import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchUserInfo } from '../../Store/user-action';


function RedirectHandler() {
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get("token");
        let refresh = urlParams.get("refresh")

        // @ts-ignore
        dispatch(fetchUserInfo())


        localStorage.clear();
        if (typeof token === "string") {
            localStorage.setItem("token", token);
        }
        if (typeof refresh === "string") {
            localStorage.setItem("refresh", refresh);
        }


        window.location.replace("/");
    }, [dispatch]);

    return (
        <></>
    );
}

export default RedirectHandler;