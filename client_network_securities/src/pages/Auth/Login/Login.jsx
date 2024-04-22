const Login = () => {


    return (
        <div className='flex flex-col gap-4 p-4 h-full w-full '>
            <h2 className='text-2xl font-bold text-main-400 group-hover:text-main-300'>Login Page</h2>
            <form className="px-1 py-3 grid grid-cols-3 gap-x-2 gap-y-6 justify-center">
                <div className="col-span-3 item w-full" >
                    <input className={`
                        rounded-lg font-mono
                        bg-main-400
                        w-full py-2 px-2.5 text-main-100 leading-tight focus:outline-none`}
                        required={true}
                        name='username'
                        type='text'
                        label='Username'
                    />
                    <label className="
                        opacity-70 pointer-events-none
                        transform transition-all duration-100 
                        absolute py-2 px-2.5 font-semibold text-main-300 text-sm
                        "
                    >Username</label>
                </div>
                <div className="col-span-3 item" >
                    <input className={`
                        rounded-lg font-mono
                        bg-main-400
                        w-full py-2 px-2.5 text-main-100 leading-tight focus:outline-none`}
                        required={true}
                        name='username'
                        type='password'
                        label='Password'
                    />
                    <label className="
                        opacity-70 pointer-events-none
                        transform transition-all duration-100 
                        absolute py-2 px-2.5 font-semibold text-main-300 text-sm
                        "
                    >Password</label>
                </div>
                <button className='
                hover:bg-main-400 hover:text-main-300
                col-span-3 bg-main-300 rounded-lg p-2 text-sm font-mono font-bold text-white'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login