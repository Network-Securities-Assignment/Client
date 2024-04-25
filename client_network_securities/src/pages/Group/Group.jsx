import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteGroup, searchAllGroups } from "../../redux/group/slice"
import { Link } from "react-router-dom"
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
                  <tr key={index} className="border-b bg-gray-800 border-gray-700 text-neutral-200 text-center">
                    <td className="py-4 px-6">
                      {group[1].values[0]}
                    </td>
                    <td className="py-4 px-6">
                      {group[0].values[0]}
                    </td>
                    <td className="py-1 px-2">
                      {group[2] ? group[2].values.map((value, index) => (
                      <div key={index} className="py-4 px-6">
                        {value}
                      </div>
                      )) : "Empty"}
                    </td>
                    <td className="flex flex-col font-semibold">
                      <Link to=''
                       className="h-full px-6 py-2 bg-main-200 hover:bg-main-300">
                          Edit
                      </Link>
                      <button 
                      onClick={() => handleDeleteGroup(group[0].values[0])}
                      className="h-full px-6 py-2 bg-main-100 hover:bg-main-300">
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
        <>
            <div className="flex flex-col gap-6">
                <h1 className="font-bold text-2xl uppercase text-main-300">Group List </h1>
                <GroupDataTable allGroupsData={allGroupsData}/>
            </div>
        </>
    )
}

export default Group 