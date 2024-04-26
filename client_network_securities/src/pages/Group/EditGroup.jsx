import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import classes from './Group.module.css'
import { removeUserFromGroup, searchGroup } from "../../redux/group/slice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const EditGroup = () => {
    const {groupname} = useParams()
    const dispatch = useDispatch()
    
    const [formData, setFormData] = useState({
        groupName:'' ,
        gidNumber:'',
        userMember: [],
    });

    useEffect(() => {
        dispatch(searchGroup(groupname))
    }, [dispatch, groupname])

    const {currentGroup, loading, error} = useSelector(state => state.group)
    useEffect(() => {
        console.log(currentGroup)
        if (currentGroup && currentGroup.info) {
            setFormData({
                groupName: currentGroup.groupName,
                gidNumber: currentGroup.info.gidNumber[0],
                userMember: currentGroup.info.memberUid
            });
        }
    },[currentGroup])
    
    if(loading) return <div>Loading...</div>
    if(error) console.error(error)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch()
    };

    const handleRemoveUser = (userCN, groupName) => {
        if(window.confirm("Are you sure ?")) {
            return dispatch(removeUserFromGroup({userCN, groupName}))
          }
    }

    return (
        <div className="flex flex-col gap-6 justify-center">
            <h1 className="font-bold text-2xl uppercase text-main-300 w-fit">Edit:{groupname}</h1>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-3 max-w-md">
                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input 
                        className="rounded-lg font-mono bg-main-200 w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none"
                        name="groupName"
                        type="text"
                        value={formData.groupName}
                        onChange={handleChange}
                    />
                    <label className="opacity-70 pointer-events-none transform transition-all duration-100 absolute py-2 px-2.5 font-semibold text-main-300 text-sm">groupName</label>
                </div>

                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input 
                        className="rounded-lg font-mono bg-main-200 w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none"
                        name="gidNumber"
                        type="text"
                        value={formData.gidNumber}
                        onChange={handleChange}
                    />
                    <label className="opacity-70 pointer-events-none transform transition-all duration-100 absolute py-2 px-2.5 font-semibold text-main-300 text-sm">gidNumber</label>
                </div>

                <div className="bg-main-200 px-4 py-6 rounded-lg font-mono">
                    <h1 className="text-main-300 text-lg font-semibold italic mb-3">Member List</h1>
                    <ul className="flex flex-col gap-2">
                        {
                            formData.userMember.map((member,index) => {
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
                                        className="
                                        hover:text-red-200
                                        text-lg text-red-500"
                                         icon="fa-solid fa-user-slash" />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <button type="submit" className="bg-main-300 hover:bg-main-200 text-main-400 hover:text-main-300 font-bold py-2 px-4 rounded-lg">Update Group</button>
            </form>
        </div>
    );
}

export default EditGroup