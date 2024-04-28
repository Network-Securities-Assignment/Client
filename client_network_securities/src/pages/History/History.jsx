import { useDispatch, useSelector } from "react-redux"
import { getHistoryEvent } from "../../redux/history/slice"
import { useEffect } from "react"
import moment from 'moment';

const History = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHistoryEvent())
    },[dispatch])

    
    const {events, loading, error} = useSelector(state => state.history)
    
    useEffect(() => {
      console.log(events)
    },[events])

    if (loading) return <div>Loading....</div>
    
    if (error) {
      return error
    }
    
    const HistoryDataTable = ({ events }) => {
        return (
          <div className="overflow-x-auto relative rounded-lg shadow-lg">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs uppercase text-center bg-gray-700 text-gray-200">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Action
                  </th>
                  <th scope="col" className="py-3 px-6">
                    User
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Group
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index} className="border-b bg-gray-800 border-gray-700 text-neutral-200 text-center font-mono text-lg">
                    <td className="py-4 px-6">
                        {event['_id']}
                    </td>
                    <td className="py-4 px-6 uppercase">
                        {event.action}
                    </td>
                    <td className="py-4 px-6">
                        {event.details.user ? event.details.user: "Empty"}
                    </td>
                    <td className="py-4 px-6">
                        {event.details.group ? event.details.group: "Empty"}
                    </td>
                    <td className="py-4 px-6">
                        {
                            moment(event.timestamp).format('LLLL')
                        }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
    return (
        <div>
            <h1 className="font-bold text-2xl uppercase text-main-300 mb-7">History</h1>
            <HistoryDataTable events={events}/>
        </div>
    )
}

export default History