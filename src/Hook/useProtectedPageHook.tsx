// 로그인된 사용자면 접속 허용, 아면 리다이렉트

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/userUser";

export default function useProtectedPageHook() {
    const { isLoggedIn, userLoading } =  useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if(!userLoading) {
            if(!isLoggedIn) {
                navigate("/");
            }
        }
    }, [userLoading, isLoggedIn, navigate]);
    return;
}