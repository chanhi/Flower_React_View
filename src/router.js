import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import MyPlant from "./routes/MyPlant";
import SignUp from "./routes/SignUp";
import BoardPost from "./routes/BoardPost";
import BoardMain from "./routes/BoardMain";
import MypageEdit from "./routes/MypageEdit";
import MypageMain from "./routes/MypageMain";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "myplant",
                element: <MyPlant />
            },
            {
                path: "signup",
                element: <SignUp />
            },
            {
                path: "mypage",
                children: [
                    {
                        path: "edit",
                        element: <MypageEdit />
                    },
                    {
                        path: "main",
                        element: <MypageMain />
                    },
                    {
                        path: "friends",
                        element: <MypageEdit />
                    },
                ]
            },
            {
                path: "board",
                children: [
                    {
                        path: "post",
                        element: <BoardPost />
                    },
                    {
                        path: "main",
                        element: <BoardMain />
                    },
                ]
            },
        ]
    }
]);

export default router;