import { Link } from "react-router-dom"

const AdminNavbar = () => {
    
    return(
        <div className="chat-navbar px-24 flex justify-end">
        <Link to={"/"} className="home-btn p-2 bg-blue-500 hover:bg-blue-400 rounded flex content-center">
            <div className="p-1">Back to home</div>
        </Link>
    </div>
    )
}

export default AdminNavbar