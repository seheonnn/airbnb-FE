// import { Route } from "react-router-dom"

import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Bookings from "./routes/Bookings";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import KakaoConfirm from "./routes/KakaoConfirm";
import ModifyRoom from "./routes/ModifyRoom";
import MyBookings from "./routes/MyBookings";
import NotFound from "./routes/NotFound";
import RoomDeatil from "./routes/RoomDetail";
import UploadPhotos from "./routes/UploadPhotos";
import UploadRoom from "./routes/UploadRoom";
import NaverConfirm from "./routes/NaverConfirm";
import GoogleConfirm from "./routes/GoogleConfirm";

// <Router>
//     <Route path="/">
//         <Home/>
//     </Route>
//     <Route path="/moviews/:id">
//         <MovieDetail />
//     </Route>
// </Router>

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <NotFound />,
        children: [
            {
                path:"",
                element: <Home />,
            },
            {
                path:"bookings",
                element: <MyBookings />,
            },
            {
                path:"rooms/upload",
                element: <UploadRoom />
            },
            {
                path:"rooms/:roomPk",
                element: <RoomDeatil />,
            },
            {
                path:"rooms/:roomPk/photos",
                element: <UploadPhotos />,
            },
            {
                path: "rooms/:roomPk/modify",
                element: <ModifyRoom />,
            },
            {
                path: "rooms/:roomPk/bookings",
                element: <Bookings />,
            },
            {
                path:"social",
                children: [
                    {
                        path:"github",
                        element:<GithubConfirm />,
                    },
                    {
                        path:"kakao",
                        element:<KakaoConfirm />,
                    },
                    {
                        path:"naver",
                        element:<NaverConfirm />,
                    },
                    {
                        path:"google",
                        element:<GoogleConfirm />,
                    },
                ]
            }
        ]
    }
]);

export default router;

// / -> Root      root component 모든 component들의 아버지. 모든 페이지에서 공유되는 부분이 들어감
// /rooms -> Rooms
// /users -> Users


////////Root component의 header///////////
////////users or rooms or ..../////////// 중간에 루트 컴포넌트가 어떤 것을 렌더링 하는지가 변하는 것.
////////Root component의 footer///////////