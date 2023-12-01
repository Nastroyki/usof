import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Context } from "../index";
import { POSTS_ROUTE } from '../utils/consts';
import { privateRoutes, publicRoutes } from '../routes';

const AppRouter = () => {
    const { user } = useContext(Context);

    console.log(user);
    return (
        <Routes>
            {user && user.isAuth && privateRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            <Route path={'*'} element={<Navigate to={POSTS_ROUTE} />} />
        </Routes>
    )
}

export default AppRouter