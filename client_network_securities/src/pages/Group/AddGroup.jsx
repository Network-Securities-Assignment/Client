import { useDispatch, useSelector } from 'react-redux';
import classes from './Group.module.css'
import { useEffect, useState } from 'react';
import { addGroup, addUserToGroup } from '../../redux/group/slice';
import { searchAllUsers } from '../../redux/user/slice';

const AddGroup = () => {
    const dispatch = useDispatch()
    const [groupInfo, setGroupInfo] = useState({
        groupName: '',
    })

    const [selectedAccounts, setSelectedAccounts] = useState([]);
    
    useEffect(() => {
        dispatch(searchAllUsers())
    },[dispatch])
    
    const handleChange = (account) => {
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


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addGroup(groupInfo))
        if(selectedAccounts.length > 0 ) dispatch(addUserToGroup({userList: selectedAccounts, groupName: groupInfo.groupName}))
    }
    const {allUserData, loading, error} = useSelector(state => state.user)


    if (loading) return <div>Loading....</div>
    
    if (error) {
      return error
    }

    
    return (
        <div className="flex flex-col gap-7">
            <h1 className="font-bold text-2xl uppercase text-main-300">Add your Group</h1>
            <form onSubmit={(e) => submitHandler(e)} className="flex flex-col gap-6 max-w-sm">
                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input className={`
                        rounded-lg font-mono
                        bg-main-100
                        w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none`}
                        required={true}
                        name='Group Name'
                        type='text'
                        label='Group Name'
                        onChange={(e) => setGroupInfo(prev => ({
                            ...prev,
                            groupName: e.target.value,
                        }))}
                    />
                    <label className="
                        opacity-70 pointer-events-none
                        transform transition-all duration-100 
                        absolute py-2 px-2.5 font-semibold text-main-300 text-sm
                        "
                    >Group Name</label>
                </div>
                <div className='bg-main-100 rounded-lg p-4'>
                    <h1 className='text-lg font-semibold text-main-300 mb-3'>Add your group member</h1>
                    {allUserData.map((account, index) => (
                        <div key={index}>
                            <label className='flex font-semibold text-main-400 gap-2 font-mono items-center p-1' >
                                <input 
                                    className='w-5 h-5 cursor-pointer accent-main-400'
                                    type="checkbox"
                                    checked={selectedAccounts.includes(account.username)}
                                    onChange={() => handleChange(account.username)}
                                />
                                {account.username}
                            </label>
                        </div>
                    ))}
                </div>


                <button type='submit' className='
                hover:bg-main-400 hover:text-main-200
                bg-main-300 w-fit px-8 py-2 rounded-sm text-main-400 font-semibold font-mono'
                >Add</button>
            </form>
        </div>
    )
}


export default AddGroup