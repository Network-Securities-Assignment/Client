import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, searchAllUsers } from "../../redux/user/slice"
import { Link } from "react-router-dom"
const User = () => {
    const dispatch = useDispatch()

    const {allUserData, loading, error} = useSelector(state => state.user)

    useEffect(() => {
      dispatch(searchAllUsers())
    },[dispatch])
    
    if (loading) return <div>Loading....</div>
    
    if (error) {
      return error
    }
    
    const handleDeleteUser = (username) => {
      if(window.confirm("Are you sure ?")) {
        return dispatch(deleteUser(username))
      }
    } 
    
    const UserDataTable = ({ allUserData }) => {
        return (
          <div className="overflow-x-auto relative rounded-lg shadow-lg">
            <table className="w-full text-sm text-left text-main-500 ">
              <thead className="text-xs uppercase text-center bg-gray-700 text-gray-200">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    User ID (UID)
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Username
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Last Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    First Name
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Group ID (GID)
                  </th>
                  <th scope="col" className="py-3 px-5">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUserData.map((userData, index) => (
                  <tr key={index} className="border-b bg-gray-800 border-gray-700 text-neutral-200 text-center font-mono text-lg">
                    <td className="py-4 px-6">
                      {userData.info.uidNumber}
                    </td>
                    <td className="py-4 px-6">
                      {userData.username}
                    </td>
                    <td className="py-4 px-6">
                      {userData.info.givenName}
                    </td>
                    <td className="py-4 px-6">
                      {userData.info.sn}
                    </td>
                    <td className="py-4 px-6">
                      {userData.info.mail}
                    </td>
                    <td className="py-4 px-6">
                      {userData.info.gidNumber}
                    </td>
                    <td className="flex flex-col font-semibold text-sm">
                      <Link to={`${userData.username}`}
                        className="py-1.5 bg-main-200 hover:bg-main-400 hover:text-main-200">
                          Edit
                      </Link>
                      <button 
                      onClick={() => handleDeleteUser(userData.username)}
                      className="py-1.5 bg-red-500 hover:bg-main-400 hover:text-main-200">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }


    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-bold text-2xl uppercase text-main-300">User Account List </h1>
            <UserDataTable allUserData={allUserData}/>
        </div>
    )
}

export default User