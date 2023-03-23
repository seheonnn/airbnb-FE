import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Root(){

    return (
    <Box>
        <Header />
        <Outlet />
        <ReactQueryDevtools />
    </Box>
    );
}
// 작은 것부터 시작해서 크기를 키워 가며 파일로 분리함. Social Login 분리 -> Login modal 분리 -> header 분리


// body {
//     font-size:16px; 이면
// }
// 1rem == 16px가 됨
// rem은 해당 body의 font-size
// rem은 font-size에 상대적