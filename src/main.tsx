import React from 'react'
import ReactDOM from 'react-dom/client'
import IAlpinistsPage from './AlpinistsPage/AlpinistsPage'
import IAlpinistPage from './AlpinistPage/alpinistPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicExample from './header';
import {createBrowserRouter, RouterProvider, Link, useLocation} from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <IAlpinistsPage/>
    },
    {
        path: '/alpinist/:id',
        element: <IAlpinistPage/>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {BasicExample()}
        <RouterProvider router={router}/>
    </React.StrictMode>,
)