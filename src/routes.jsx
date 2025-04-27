import { Children } from "react"
import App from "./App"
import CreateTask from "./pages/Create"
import AllTasks from "./pages/AllTasks"
import Home from "./pages/Home"
import EisenHower from "./pages/EisenHower"
import { Navigate } from "react-router-dom"
import ImportantAndUrgent from "./pages/ImportantAndUrgent"
import Urgent from "./pages/Urgent"
import Others from "./pages/Others"
import Important from "./pages/Important"


export const routes = ([
    {
        path: '/',
        element: < App/>,
        children: [
            {
                path: '',
                element: <Navigate to='/eisenhower' />
            },
            {
                path: '/home',
                element: <Home/>,
                children:[
                    {
                        path: '',
                        element: <Navigate to='/home/importantAndUrgent'/>
                    },
                    {
                        path: '/home/importantAndUrgent',
                        element: < ImportantAndUrgent/>
                    },
                    {
                        path: '/home/urgent',
                        element: <Urgent/>
                    },
                    {
                        path: '/home/others',
                        element: <Others/>
                    },
                    {
                        path: '/home/important',
                        element: <Important/>
                    }
                ]
                
            },
            {
                path: '/eisenhower',
                element: <EisenHower/>
            },
            {
                path: '/create',
                element: < CreateTask/>
            },
            {
                path: '/tasks',
                element: < AllTasks/>
            }
        ]
    }
])
