import { Link } from 'react-router-dom'
import './Auth.scss'

const Auth = ({children}) => {

    return (
        <div className="
        min-h-[300px] w-[350px] group flex
        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        hover:border-main-300
        bg-main-100 rounded-lg p-4
        desktop:max-w-2xl border-4 border-main-400">
                {children}
        </div>
    )
}

export default Auth

export function Select(){


    return(
        <div className='flex flex-col gap-8 w-full'>
            <h2 className='text-3xl font-bold text-main-400 group-hover:text-main-300 uppercase text-center'>Authentication</h2>
            <div className='flex flex-col gap-4 p-2 h-full'>
                <Link to='login'
                className='rounded
                    w-full h-full flex justify-center items-center
                    hover:bg-main-400 hover:text-main-300
                    col-span-3 bg-main-300  p-2 text-2xl font-mono font-bold text-white uppercase'>
                        Login your account
                </Link>
                <Link to='signup'
                className='rounded
                    w-full h-full flex justify-center items-center
                    hover:bg-main-400 hover:text-main-300
                    col-span-3 bg-main-300  p-2 text-2xl font-mono font-bold text-white uppercase'>
                        Sign up an account
                </Link>
            </div>

        </div>
    )
}