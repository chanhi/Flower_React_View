import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import MyPlant from "./routes/MyPlant";
import SignUp from "./routes/SignUp";
import BoardPost from "./routes/BoardPost";
import BoardMain from "./routes/BoardMain";

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