import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
    // State to manage multiple dropdowns
    const [dropdownOpen, setDropdownOpen] = useState({});

    const toggleDropdown = (id) => {
        setDropdownOpen(prevState => ({
            ...prevState,
            [id]: !prevState[id]  // Toggle the boolean value for the dropdown with the given id
        }));
    };

    const ManageItem = [
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-user" className="w-5"/>, 
            name: 'User',
            link: '/user',
            children: [
                {
                    icon: <FontAwesomeIcon icon="fa-solid fa-user-plus" />,
                    name: 'Add User',
                    link: '/addUser',
                },
            ]
        },
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-users" className="w-5" />,
            name: 'Group',
            link: '/group',
            children: [
                {
                    icon: <FontAwesomeIcon icon="fa-solid fa-user-group" />,
                    name: 'Add Group',
                    link: '/addGroup',
                },
            ]
        },
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-history" className="w-5"/>, 
            name: 'History',
            link: '/history',
            children: []
        },

    ]

    return (
        <aside className="bg-main-100 px-0 py-10">
            <div className="flex flex-col">
                <div className="text-main-400">
                    <h1 className="pl-4 pb-2 text-sm">Manage</h1>
                    {
                        ManageItem.map((item,index) => (
                            <div key={index} 
                            className="flex flex-col"
                            >
                                <NavLink  to={item.link}
                                className={({isActive}) => `${isActive ? 'bg-main-300 text-main-400' : 'text-main-300'}
                                    flex items-center gap-4 w-full 
                                    text-lg font-semibold py-3 pl-4
                                    `}>
                                    {item.icon}
                                    <p>
                                    {item.name}
                                    </p>
                                    <FontAwesomeIcon onClick={() => toggleDropdown(item.name)}
                                    icon="fa-solid fa-chevron-down" className="text-xl"/>
                                </NavLink>
                                {
                                    item.children.map((child,idx) => (
                                        dropdownOpen[item.name] && <div key={idx} className="" >
                                        <NavLink to={child.link}
                                            className={({isActive}) => `${isActive ? 'bg-main-300 text-main-400' : 'text-main-300'}
                                            ml-6 flex gap-4 w-full items-center
                                            rounded-md
                                            text-sm font-semibold py-3 pl-4`}
                                            >
                                            <div>
                                                {child.icon}
                                            </div>
                                            <p>
                                                {child.name}
                                            </p>
                                        </NavLink>
                                        </div>
                                    ))
                                }
                            </div>  
                        ))
                    }
                </div>

            </div>
        </aside>
    )
}

export default Sidebar