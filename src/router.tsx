// import { Route } from "react-router-dom"

import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";

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