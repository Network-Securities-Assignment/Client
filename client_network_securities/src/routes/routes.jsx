import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import Login from '../pages/Auth/Login/Login'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home/Home'
import Auth, { Select } from '../pages/Auth/Auth'
import Signup from '../pages/Auth/Signup/Signup'
import Group from '../pages/Group/Group'
import User from '../pages/User/User'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import AddUser from '../pages/User/AddUser'
import AddGroup from '../pages/Group/AddGroup'
import EditUser from '../pages/User/EditUser'
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
    const location = useLocation()
    const isAuth = useSelector(state => state.auth.isAuth)
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuth) navigate('/auth')
    },[])
    return (
        <Routes location={location}> 
            {publicRoutes.map((route, index) => {
                const Page = route.component
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Auth>
                                <Page/>
                            </Auth>
                        }
                    />
                )
            })}
            { privateRoutes.map((route, index) => {
                const Page = route.component
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            isAuth ? (
                            <Layout>
                                <Page/>
                            </Layout>
                            ) : <Navigate to= '/' replace/>

                        } 
                    />
                )
            })}
        </Routes>
    )
}

export default MainRoute