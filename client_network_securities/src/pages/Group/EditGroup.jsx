import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import classes from './Group.module.css'
import { removeUserFromGroup, searchGroup, updateGroup } from "../../redux/group/slice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { searchAllUsers } from "../../redux/user/slice"
const EditGroup = () => {
    const {groupname} = useParams()

    const [selectedAccounts, setSelectedAccounts] = useState([]);

    const dispatch = useDispatch()
    
    const [formData, setFormData] = useState({
        groupName:'' ,
        gidNumber:'',
        userMember: [],
    });

    useEffect(() => {
        dispatch(searchGroup(groupname))
        dispatch(searchAllUsers())
    }, [dispatch, groupname])

    const {currentGroup, loading, error} = useSelector(state => state.group)
    const {allUserData, loading1, error1} = useSelector(state => state.user)

    useEffect(() => {
        if (currentGroup && currentGroup.info) {
            setFormData(prev => ({
                ...prev,
                groupName: currentGroup.groupName,
                gidNumber: currentGroup.info.gidNumber[0],
            }));
        }
    },[currentGroup])
    
    
    if(loading || loading1) return <div>Loading...</div>
    if(error || error1) console.error(error)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateGroup({
            ...formData,
            defaultGroupName: groupname,
            userMember: selectedAccounts
        }))
    };

    const handleRemoveUser = (userCN, groupName) => {
        if(window.confirm("Are you sure ?")) {
            return dispatch(removeUserFromGroup({userCN, groupName}))
          }
    }

    const handleSelectedUser = (account) => {
        setSelectedAccounts(prev => {
            // Check if the account is already selected
            if (prev.includes(account)) {
                // Remove it from array if it was already selected
                return prev.filter(item => item !== account);
            } else {
                // Add it to the array if it wasn't selected
                return [...prev, account];
            }
        });
    };

    const handleExistingAccount = (userMember, allUserData) => {
        const filteredData = allUserData.filter(item => userMember && !userMember.includes(`cn=${item.username}, ou=users, dc=netsecurityass, dc=com`))
        return filteredData
    }

    return (
        <div className="flex flex-col gap-6 justify-center">
            <h1 className="font-bold text-2xl uppercase text-main-300 w-fit">Edit:{groupname}</h1>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-3 max-w-md">
                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input 
                        className="rounded-lg font-mono bg-main-100 w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none"
                        name="groupName"
                        type="text"
                        value={formData.groupName}
                        onChange={handleChange}
                    />
                    <label className="opacity-70 pointer-events-none transform transition-all duration-100 absolute py-2 px-2.5 font-semibold text-main-300 text-sm">groupName</label>
                </div>

                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input 
                        className="rounded-lg font-mono bg-main-100 w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none"
                        name="gidNumber"
                        type="text"
                        value={formData.gidNumber}
                        onChange={handleChange}
                    />
                    <label className="opacity-70 pointer-events-none transform transition-all duration-100 absolute py-2 px-2.5 font-semibold text-main-300 text-sm">gidNumber</label>
                </div>

                <div className="bg-main-100 px-4 py-6 rounded-lg">
                    <h1 className="text-main-300 text-lg font-semibold mb-3">Member List</h1>
                    <ul className="flex flex-col gap-2">
                        {
                            currentGroup && currentGroup.info && currentGroup.info.memberUid.map((member,index) => {
                                return (
                                    <li key={index} className="flex gap-2 items-center  bg-main-300
                                    text-main-400 px-2 py-1 rounded-md border border-main-300">
                                        <div className="h-auto  px-2">
                                            {index}
                                        </div>
                                        <div className="border-x border-main-400 px-2">
                                            {member}
                                        </div>
                                        <FontAwesomeIcon 
                                        onClick={() => handleRemoveUser(member, groupname)}
                                        className=" cursor-pointer
                                        hover:text-red-200
                                        text-lg text-red-500"
                                         icon="fa-solid fa-user-slash" />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>


                <div className='bg-main-100 rounded-lg p-4'>
                    <h1 className='text-lg font-semibold text-main-300 mb-6'>Add your group member</h1>
                    {handleExistingAccount(currentGroup && currentGroup.info && currentGroup.info.memberUid, allUserData).map((account, index) => {
                        return (
                            <div key={index}>
                                <label className='flex font-semibold text-main-400 gap-2 font-mono items-center p-1' >
                                    <input 
                                        className='w-5 h-5 cursor-pointer accent-main-400'
                                        type="checkbox"
                                        checked={selectedAccounts.includes(account.username)}
                                        onChange={() => handleSelectedUser(account.username)}
                                    />
                                    {account.username}
                                </label>
                            </div>
                        )
                    })}
                </div>

                <button type="submit" className="bg-main-300 hover:bg-main-100 text-main-400 hover:text-main-300 font-bold py-2 px-4 rounded-lg">Update Group</button>
            </form>
        </div>
    );
}

export default EditGroup