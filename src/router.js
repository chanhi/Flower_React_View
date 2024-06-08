import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import MyPlant from "./routes/MyPlant";
import SignUp from "./routes/SignUp";

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
        ]
    }
]);

export default router;