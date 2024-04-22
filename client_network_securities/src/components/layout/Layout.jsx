import Header from "../interface/Header/Header"
import Sidebar from "../interface/Sidebar/Sidebar"
import './Layout.scss'


const Layout = ({children}) => {

    return (
        <div id="layout">
            <Sidebar/>
            <main id="main">
                {children}
            </main>
        </div>
    )
}

export default Layout