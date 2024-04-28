import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteGroup, searchAllGroups } from "../../redux/group/slice"
import { Link } from "react-router-dom"
import { attributeObject } from "../../utils/obj"
const Group = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(searchAllGroups())
    },[dispatch])

    const {allGroupsData, loading, error} = useSelector(state => state.group)

    if (loading) return <div>Loading....</div>
    
    if (error) {
      return error
    }

    const handleDeleteGroup = (cn) => {
      if(window.confirm("Are you sure ?")) {
        return dispatch(deleteGroup(cn))
      }
    } 

    const GroupDataTable = ({ allGroupsData }) => {
        return (
          <div className="overflow-x-auto relative rounded-lg shadow-lg">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs uppercase text-center bg-gray-700 text-gray-200">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Group ID (GID)
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Group name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    MemberUID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allGroupsData.map((group, index) => (
                  <tr key={index} className="border-b bg-gray-800 border-gray-700 text-neutral-200 text-center font-mono text-lg">
                    <td className="py-4 px-6">
                      {attributeObject(group).gidNumber}
                    </td>
                    <td className="py-4 px-6">
                      {attributeObject(group).cn}
                    </td>
                    <td className="py-1 px-2 flex flex-col gap-2 ">
                      {attributeObject(group).memberUid ? attributeObject(group).memberUid.map((value, index) => (
                      <div key={index} className="flex">
                        <div className="border-r border-main-400 px-2">
                          {index}
                        </div>
                        <div className="px-2">
                          {value}
                        </div>
                      </div>
                      )) : "Empty"}
                    </td>
                    <td className="font-semibold text-md">
                      <div className="flex items-center justify-center">
                        <Link to={`${attributeObject(group).cn}`}
                        className="py-2 px-6 bg-main-300 hover:bg-main-400 hover:text-main-200">
                            Edit
                        </Link>
                        <button 
                        onClick={() => handleDeleteGroup(attributeObject(group).cn[0])}
                        className="py-2 px-5 bg-red-500 hover:bg-main-400 hover:text-main-200">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-6">
                <h1 className="font-bold text-2xl uppercase text-main-300">Group List </h1>
                <GroupDataTable allGroupsData={allGroupsData}/>
            </div>
        </>
    )
}

export default Group 