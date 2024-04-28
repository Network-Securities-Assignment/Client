import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Pic from '../../assets/pic.png'
const Home = () => {

    const students = [
        {
            name: "Nguyễn Hoàng Tuấn Bảo",
            id: "2012667",
            role: [
                "Front-end",
                "System design",
            ]
        },
        {
            name: "Trần Anh Vỹ",
            id: "2015126",
            role: [
                "Back-end",
                "System design",
            ]
        }
    ]

    return (
        <>
        <div className="h-full">
            <div className="bg-main-500 px-16 py-12 rounded-md flex flex-col h-full">
                <h1 className="text-5xl font-semibold text-main-400 text-center"
                >Network Security Assignment</h1>
                <div className="flex gap-5 justify-center items-center h-full">
                    <div className="border-main-400 border-4 p-2 rounded-lg">
                        <img className="outline-none max-w-[380px] " src={Pic}/>
                    </div>
                    <div className="rounded-lg">
                        <ul className="flex flex-col gap-4 p-4 font-sans text-lg text-main-200 font-normal">
                            <div className="ml-7 bg-main-400 px-4 py-2 rounded-lg border-main-100 border">
                                <p className="">
                                    <FontAwesomeIcon icon="fa-solid fa-chalkboard-user" className="mr-1.5"  /> Teacher: Nguyễn Cao Đạt
                                </p>
                            </div>
                            {
                                students.map((student, index) => {
                                    return (
                                        <li key={index} className="w-full flex gap-4">
                                            <p className="font-bold text-main-400">{index+1}.</p>
                                            <div className="w-full px-4 py-3 bg-main-400 shadow-sm border border-main-100 rounded-lg flex flex-col gap-1.5">
                                                <p className="flex items-center gap-1.5"><FontAwesomeIcon icon="fa-solid fa-signature"/>Name: <span className="font-light">{student.name}</span></p>
                                                <p className="flex items-center gap-2"><FontAwesomeIcon icon="fa-solid fa-id-card"/>Student ID: 
                                                <span className="font-light">
                                                {student.id}
                                                </span></p>
                                                <p className="flex gap-3"><FontAwesomeIcon icon="fa-solid fa-check" className="mt-1.5"/>Role: 
                                                <div>
                                                    {student.role.map((role,index) => <p className="font-light items-center" key={index}><FontAwesomeIcon icon="fa-solid fa-chevron-right" className="text-sm mt-2 mr-2"/>{role}</p>)}
                                                </div>
                                                </p>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


export default Home