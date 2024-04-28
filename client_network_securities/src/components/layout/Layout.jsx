import Header from "../interface/Header/Header"
import Sidebar from "../interface/Sidebar/Sidebar"
import './Layout.scss'


const Layout = ({children}) => {

    return (
        <div id="layout" >
            <Sidebar/>
            <Header/>
            <main id="main" className="bg-main-200">
                {children}
            </main>
        </div>
    )
}

export default Layout