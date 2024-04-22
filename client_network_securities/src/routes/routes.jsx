import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Auth/Login/Login'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home/Home'
import Auth, { Select } from '../pages/Auth/Auth'
import Signup from '../pages/Auth/Signup/Signup'
const privateRoutes = [
    {
        name: 'Home',
        path: '/',
        component: Home

    }
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
    return (
        <Routes> 
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
            {privateRoutes.map((route, index) => {
                        const Page = route.component
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                    </Layout>
                                }
                            />
                        )
                    })}
        </Routes>
    )
}

export default MainRoute