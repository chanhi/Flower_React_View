import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import MyPlant from "./routes/MyPlant";
import SignUp from "./routes/SignUp";
import BoardPost from "./routes/BoardPost";
import BoardMain from "./routes/BoardMain";
import MypageEdit from "./routes/MypageEdit";
import MypageMain from "./routes/MypageMain";
import BorderShow from "./routes/BorderShow";
import Test from "./routes/Test";
import Editor from "./routes/Editor";
import BoardEdit from "./routes/BoardEdit";
import NoticeMain from "./routes/NoticeMain";
import NoticeShow from "./routes/NoticeShow";
import NoticeEdit from "./routes/NoticeEdit";
import NoticePost from "./routes/NoticePost";
import NotFound from "./routes/NotFound"


//---------------라우터 여기서 url에 따라 라우팅--------------------
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
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
                path: "mypage/:userId",
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
                        path: "edit/:boardId",
                        element: <BoardEdit />
                    },
                    {
                        path: "main",
                        element: <BoardMain />
                    },
                    {
                        path: "show/:boardId",
                        element: <BorderShow />
                    },
                ]
            },
            {
                path: "notice",
                children: [
                    {
                        path: "post",
                        element: <NoticePost />
                    },
                    {
                        path: "edit/:noticeId",
                        element: <NoticeEdit />
                    },
                    {
                        path: "main",
                        element: <NoticeMain />
                    },
                    {
                        path: "show/:noticeId",
                        element: <NoticeShow />
                    },
                ]
            },
            {
                path: "test",
                element: <Test />
            },
            {
                path: "editor",
                element: <Editor />
            }
        ]
    }
]);

export default router;