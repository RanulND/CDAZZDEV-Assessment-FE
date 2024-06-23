import { Link } from "react-router-dom"

const AdminNavbar = () => {

    return (
        <div className="h-16 content-center shadow-lg bg-slate-200">
            <div className="chat-navbar px-24 flex justify-end">
                <Link to={"/"} className="home-btn p-2 bg-lime-500 hover:bg-lime-400 rounded flex content-center">
                    <div className="p-1">Back to home</div>
                </Link>
            </div>
        </div>
    )
}

export default AdminNavbar