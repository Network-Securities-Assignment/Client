import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

const Sidebar = () => {

    const ManageItem = [
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-user" className="w-5"/>, 
            name: 'User',
            link: '/user',
        },
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-user-plus" />,
            name: 'Add User',
            link: '/addUser',
        },
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-users" className="w-5" />,
            name: 'Group',
            link: '/group',
        },
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-user-group" />,
            name: 'Add Group',
            link: '/addGroup',
        },
    ]


    return (
        <aside className="bg-main-100  px-0 py-10">
            <div className="flex flex-col">
                <div className="text-main-400">
                    <h1 className="pl-4 pb-2 text-sm">Manage</h1>
                    {
                        ManageItem.map((item,index) => (
                            <NavLink key={index} 
                            className={({isActive}) => `${isActive ? 'bg-main-300 text-main-400' : 'text-main-300'}
                            flex gap-4 w-full
                            text-lg font-semibold py-3 pl-4
                            `}
                            to={item.link}>
                                <div>
                                    {item.icon}
                                </div>
                                <p>
                                    {item.name}
                                </p>
                            </NavLink>
                        ))
                    }
                </div>

            </div>
        </aside>
    )
}

export default Sidebar