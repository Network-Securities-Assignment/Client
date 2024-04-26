import { useParams, } from "react-router-dom"
import { useEffect, useState } from "react";
import classes from './User.module.css'
import { useDispatch, useSelector } from "react-redux";
import { searchUser, updateUser } from "../../redux/user/slice";
const EditUser = () => {
    const {username} = useParams()

    const dispatch = useDispatch()
    
    const [formData, setFormData] = useState({
        mail:'' ,
        gidNumber: '',
        givenName:'' ,
        sn: '',
        uidNumber: '',
        userPassword: '',
    });

    const {currentUser, loading, error} = useSelector(state => state.user)
    useEffect(() => {
        dispatch(searchUser(username))
    },[dispatch,username])

    useEffect(() => {
        if (currentUser && currentUser.info) {
            setFormData({
                mail: currentUser.info.mail ? currentUser.info.mail[0] : '',
                gidNumber: currentUser.info.gidNumber ? currentUser.info.gidNumber[0] : '',
                givenName: currentUser.info.givenName ? currentUser.info.givenName[0] : '',
                sn: currentUser.info.sn ? currentUser.info.sn[0] : '',
                uidNumber: currentUser.info.uidNumber ? currentUser.info.uidNumber[0] : '',
                userPassword: '', // Presumably, you will not pre-fill passwords
            });
        }
    },[currentUser])
    
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
        dispatch(updateUser({username:username, userData: formData }))
    };
    

    return (
        <div className="flex flex-col gap-6 justify-center">
            <h1 className="font-bold text-2xl uppercase text-main-300 w-fit">Add User</h1>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-3 max-w-sm">
                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input 
                        className="rounded-lg font-mono bg-main-200 w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none"
                        name="mail"
                        type="text"
                        value={formData.mail}
                        onChange={handleChange}
                    />
                    <label className="opacity-70 pointer-events-none transform transition-all duration-100 absolute py-2 px-2.5 font-semibold text-main-300 text-sm">Email</label>
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

                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input 
                        className="rounded-lg font-mono bg-main-200 w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none"
                        name="givenName"
                        type="text"
                        value={formData.givenName}
                        onChange={handleChange}
                    />
                    <label className="opacity-70 pointer-events-none transform transition-all duration-100 absolute py-2 px-2.5 font-semibold text-main-300 text-sm">givenName</label>
                </div>

                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input 
                        className="rounded-lg font-mono bg-main-200 w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none"
                        name="uidNumber"
                        type="text"
                        value={formData.uidNumber}
                        onChange={handleChange}
                    />
                    <label className="opacity-70 pointer-events-none transform transition-all duration-100 absolute py-2 px-2.5 font-semibold text-main-300 text-sm">uidNumber</label>
                </div>

                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input 
                        className="rounded-lg font-mono bg-main-200 w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none"
                        name="sn"
                        type="text"
                        value={formData.sn}
                        onChange={handleChange}
                    />
                    <label className="opacity-70 pointer-events-none transform transition-all duration-100 absolute py-2 px-2.5 font-semibold text-main-300 text-sm">sn</label>
                </div>

                <div className={`${classes.item} "col-span-3 item w-full"`} >
                    <input 
                        className="rounded-lg font-mono bg-main-200 w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none"
                        name="userPassword"
                        type="password"
                        value={formData.userPassword}
                        onChange={handleChange}
                    />
                    <label className="opacity-70 pointer-events-none transform transition-all duration-100 absolute py-2 px-2.5 font-semibold text-main-300 text-sm">Password</label>
                </div>

                <button type="submit" className="bg-main-300 hover:bg-main-200 text-main-400 hover:text-main-300 font-bold py-2 px-4 rounded-lg">Update User</button>
            </form>
        </div>
    );
}


export default EditUser