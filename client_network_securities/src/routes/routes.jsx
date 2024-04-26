import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import Login from '../pages/Auth/Login/Login'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home/Home'
import Auth, { Select } from '../pages/Auth/Auth'
import Signup from '../pages/Auth/Signup/Signup'
import Group from '../pages/Group/Group'
import User from '../pages/User/User'
import AddUser from '../pages/User/AddUser'
import AddGroup from '../pages/Group/AddGroup'
import EditUser from '../pages/User/EditUser'
import EditGroup from '../pages/Group/EditGroup'
import { isAuthenticated } from '../utils/auth'
import { useEffect } from 'react'

const privateRoutes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    }, 
    {
        name: 'User',
        path: '/user',
        component: User
    }, 
    {
        name: 'User',
        path: '/user/:username',
        component: EditUser,
    }, 
    {
        name: 'Group',
        path: '/group',
        component: Group
    }, 
    {
        name: 'EditGroup',
        path: '/group/:groupname',
        component: EditGroup,
    }, 
    {
        name: 'User',
        path: '/addUser',
        component: AddUser
    }, 
        {
        name: 'Add Group',
        path: '/addGroup',
        component: AddGroup
    }, 

]
const publicRoutes =[
    {
        name: 'Auth',
        path: '/auth',
        component: Select,
    },
    {
        name: 'Login',
        path: '/auth/login',
        component: Login,
    },
    {
        name: 'Signup',
        path: '/auth/signup',
        component: Signup,
    },
]

const MainRoute = () => {
    const PrivateRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/auth/" replace />;
    };

    const PublicRoute = ({ children }) => {
        return !isAuthenticated() ? children : <Navigate to="/" replace />;
    };

    return (
        <Routes>
            {publicRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <PublicRoute>
                            <Auth>
                                <route.component />
                            </Auth>
                        </PublicRoute>
                    }
                />
            ))}
            {privateRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <PrivateRoute>
                            <Layout>
                                <route.component />
                            </Layout>
                        </PrivateRoute>
                    }
                />
            ))}
        </Routes>
    );
};

export default MainRoute;