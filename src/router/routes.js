
import { Navigate } from "react-router-dom";
import Account from "../pages/Account";
import Create from "../pages/Create";
import Find from "../pages/Find";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Reg from "../pages/Reg";
import Rules from "../pages/Rules";
import Match from "../pages/Match";

export const publicRoutes = [
    {path: '/main', element: <Main/>},
    {path: '/find', element: <Find/>},
    {path: '/rules', element: <Rules/>},
    {path: '/login', element: <Login/>},
    {path: '/reg', element:<Reg/>},
    {path: '/create', element: <Navigate to='/login' replace/>},
    {path: '/match', element: <Match/>},
]

export const privateRoutes = [
    {path: '/main', element: <Main/>},
    {path: '/find', element: <Find/>},
    {path: '/rules', element: <Rules/>},
    {path: '/create', element: <Create/>},
    {path: '/account', element: <Account/>},
    {path: '/match', element: <Match/>},
]