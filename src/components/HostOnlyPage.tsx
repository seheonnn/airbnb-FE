// 로그인된 되고 host이면 접속 허용, 아면 리다이렉트

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/userUser";

interface IHostOnlyPageProps{
    children: React.ReactNode
}

export default function HostOnlyPage({ children } : IHostOnlyPageProps) {
    const { user, userLoading } =  useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if(!userLoading) {
            if(!user?.is_host) {
                navigate("/");
            }
        }
    }, [userLoading, user, navigate])
    return <> {children} </>;
}