import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Root(){

    return (
    <Box>
        <Header />
        <Outlet />
    </Box>
    );
}


// body {
//     font-size:16px; 이면
// }
// 1rem == 16px가 됨
// rem은 해당 body의 font-size
// rem은 font-size에 상대적