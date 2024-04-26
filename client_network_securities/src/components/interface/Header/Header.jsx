import { useDispatch } from "react-redux"
import { logout } from "../../../redux/auth/slice"

const Header = () => {
    const dispatch = useDispatch()
    return (
        <header className="bg-main-100 w-full flex justify-between">
            <div className="
            text-lg text-main-300 font-semibold">
                Identity and Access Manager Application
            </div>
            <div className="text-main-400 flex gap-6 items-center">
                Welcome back, admin
                <button className="bg-main-300 px-4 py-1 font-mono rounded hover:bg-main-400 hover:text-main-300" onClick={() => dispatch(logout())}>
                    Logout
                </button>
            </div>
        </header>
    )
}

export default Header