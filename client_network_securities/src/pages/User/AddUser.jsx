import { useEffect, useState } from 'react'
import classes from './User.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../redux/user/slice'
import { searchAllGroups } from '../../redux/group/slice'
import { attributeObject } from '../../utils/obj'

const AddUser = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
        retypePassword: '',
        group: '',
    })
    const dispatch = useDispatch()

    const {allGroupsData, loading, error} = useSelector(state => state.group)

    useEffect(() => {
        dispatch(searchAllGroups())
    },[dispatch])

    if (loading) return <div>Loading....</div>
    
    if (error) {
      return error
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        if (userInfo.password !== userInfo.retypePassword) {
            alert('Passwords do not match!');
            return;
        }
        dispatch(addUser(userInfo))
    }

    return (
        <div className="flex flex-col gap-8">
            <h1 className="font-bold text-2xl uppercase text-main-300">Add User</h1>
            <form onSubmit={(e) => submitHandler(e)} className="flex flex-col gap-6 max-w-sm">
                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input className={`
                        rounded-lg font-mono
                        bg-main-100
                        w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none`}
                        required={true}
                        name='First Name'
                        type='text'
                        label='First Name'
                        onChange={(e) => setUserInfo(prev => ({
                            ...prev,
                            firstName: e.target.value,
                        }))}
                    />
                    <label className="
                        opacity-70 pointer-events-none
                        transform transition-all duration-100 
                        absolute py-2 px-2.5 font-semibold text-main-300 text-sm
                        "
                    >First Name</label>
                </div>
                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input className={`
                        rounded-lg font-mono
                        bg-main-100
                        w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none`}
                        required={true}
                        name='Last Name'
                        type='text'
                        label='Last Name'
                        onChange={(e) => setUserInfo(prev => ({
                            ...prev,
                            lastName: e.target.value,
                        }))}
                    />
                    <label className="
                        opacity-70 pointer-events-none
                        transform transition-all duration-100 
                        absolute py-2 px-2.5 font-semibold text-main-300 text-sm
                        "
                    >Last Name</label>
                </div>
                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input className={`
                        rounded-lg font-mono
                        bg-main-100
                        w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none`}
                        required={true}
                        name='Email'
                        type='text'
                        label='Email'
                        onChange={(e) => setUserInfo(prev => ({
                            ...prev,
                            email: e.target.value,
                        }))}
                    />
                    <label className="
                        opacity-70 pointer-events-none
                        transform transition-all duration-100 
                        absolute py-2 px-2.5 font-semibold text-main-300 text-sm
                        "
                    >Email</label>
                </div>
                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input className={`
                        rounded-lg font-mono
                        bg-main-100
                        w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none`}
                        required={true}
                        name='username'
                        type='text'
                        label='Username'
                        onChange={(e) => setUserInfo(prev => ({
                            ...prev,
                            username: e.target.value,
                        }))}
                    />
                    <label className="
                        opacity-70 pointer-events-none
                        transform transition-all duration-100 
                        absolute py-2 px-2.5 font-semibold text-main-300 text-sm
                        "
                    >Username</label>
                </div>
                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input className={`
                        rounded-lg font-mono
                        bg-main-100
                        w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none`}
                        required={true}
                        name='password'
                        type='password'
                        label='Password'
                        onChange={(e) => setUserInfo(prev => ({
                            ...prev,
                            password: e.target.value,
                        }))}
                    />
                    <label className="
                        opacity-70 pointer-events-none
                        transform transition-all duration-100 
                        absolute py-2 px-2.5 font-semibold text-main-300 text-sm
                        "
                    >Password</label>
                </div>
                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input className={`
                        rounded-lg font-mono
                        bg-main-100
                        w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none`}
                        required={true}
                        name='retypePassword'
                        type='password'
                        label='retypePassword'
                        onChange={(e) => setUserInfo(prev => ({
                            ...prev,
                            retypePassword: e.target.value,
                        }))}
                    />
                    <label className="
                        opacity-70 pointer-events-none
                        transform transition-all duration-100 
                        absolute py-2 px-2.5 font-semibold text-main-300 text-sm
                        "
                    >Retype your Password</label>
                </div>
                <div>
                <select onChange={(e) => {
                    let { value} = e.target
                    return setUserInfo(prev => ({
                        ...prev,
                        group: value,
                    })) 
                }}
                className="font-mono font-semibold text-sm py-2 px-2.5 rounded-lg leading-tight bg-main-100 w-3/4 text-main-300">
                <option value="">Select your primary group</option>
                {allGroupsData.map((group,index) => {
                    return (
                        <option key={index} value={attributeObject(group).gidNumber}>
                        {attributeObject(group).cn}
                    </option>
                    )
                }

                )}
                </select>
                </div>
                <button type='submit' className='bg-main-300 w-fit px-8 py-3 rounded text-main-400 font-semibold text-sm'
                >Add</button>
            </form>
        </div>
    )
}

export default AddUser