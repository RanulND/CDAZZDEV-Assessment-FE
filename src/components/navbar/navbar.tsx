import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAccessToken, removeAccessToken } from "../../services/tokenService"
import { jwtDecode } from "jwt-decode"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { assignCurrentUser, removeCurrentUser } from "../../store/features/authSlice"
import { ROLES, User } from "../../types/user"
import logo from '../../logo.svg';
import LoginModal from "../loginModal/loginModal"

type Props = {
    active: string | null
}
const Navbar = (props: Props) => {
    const dispatch = useAppDispatch()
    const { currentUser } = useAppSelector(state => state.auth)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const navigate = useNavigate()

    const handleUser = () => {
        const token = getAccessToken()
        if (token) {
            const user: User = jwtDecode(token)
            dispatch(assignCurrentUser(user))
        } else {
            dispatch(removeCurrentUser())
        }
    }

    const logout = () => {
        dispatch(removeCurrentUser())
        localStorage.clear();
        navigate("/")
    }

    useEffect(() => {
        window.addEventListener('userLoggedIn', handleUser)
        window.addEventListener('userLoggedOut', logout)

        handleUser()
    }, [])

    return (
        <>
            {
                currentUser !== null ? (
                    currentUser.role === ROLES.ADMIN ? (
                        <div className="h-20 content-center shadow-lg bg-slate-200">
                            <div className="md:px-24 px-24 flex">
                                <div className="flex lg:w-4/6 w-3/6 md:gap-10 sm:gap-6 items-center">
                                    <div className="content-center">
                                        <img src={logo} alt="logo" className="w-10 h-10" />
                                    </div>
                                    <Link to={"/"} className={`p-2 rounded-lg flex content-center font-semibold hover:bg-slate-300 ${props.active === 'home'? "bg-slate-300":""}`}>
                                        <div className="p-1">Home</div>
                                    </Link>
                                    <Link to={"/courses"} className={`p-2 rounded-lg flex content-center font-semibold hover:bg-slate-300 ${props.active === 'course'? "bg-slate-300":""}`}>
                                        <div className="p-1">Courses</div>
                                    </Link>
                                    <Link to={"/admin"} className={`p-2 rounded-lg flex content-center font-semibold hover:bg-slate-300 ${props.active === 'admin'? "bg-slate-300":""}`}>
                                        <div className="p-1">Admin</div>
                                    </Link>
                                </div>
                                <div className="flex w-3/6 justify-end gap-2">
                                    <button className="home-btn p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg flex content-center justify-self-end font-semibold" onClick={_ => removeAccessToken()}>
                                        <div className="p-1">Log out</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-20 content-center shadow-lg bg-slate-200">
                            <div className="md:px-24 px-4 flex">
                                <div className="flex items-center w-4/6 gap-10">
                                    <div className="">
                                        <img src={logo} alt="logo" className="w-10 h-10" />
                                    </div>
                                    <Link to={"/"} className={`p-2 rounded-lg flex content-center font-semibold hover:bg-slate-300 ${props.active === 'home'? "bg-slate-300":""}`}>
                                        <div className="p-1">Home</div>
                                    </Link>
                                    <Link to={"/courses"} className={`p-2 rounded-lg flex content-center font-semibold hover:bg-slate-300 ${props.active === 'course'? "bg-slate-300":""}`}>
                                        <div className="p-1">Courses</div>
                                    </Link>
                                </div>
                                <div className="flex w-2/6 justify-end gap-2">
                                    <button className="home-btn p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg flex content-center justify-self-end font-semibold" onClick={_ => removeAccessToken()}>
                                        <div className="p-1">Log out</div>
                                    </button>
                                </div>

                            </div>
                        </div>
                    )) : (
                    <div className="h-20 content-center shadow-lg bg-slate-200">
                        <div className="md:px-24 px-4 flex">
                            <div className="flex items-center w-4/6 gap-10">
                                <div className="">
                                    <img src={logo} alt="logo" className="w-10 h-10" />
                                </div>
                                <Link to={"/"} className={`p-2 rounded-lg flex content-center font-semibold hover:bg-slate-300 ${props.active === 'home'? "bg-slate-300":""}`}>
                                    <div className="p-1">Home</div>
                                </Link>
                                <Link to={"/courses"} className={`p-2 rounded-lg flex content-center font-semibold hover:bg-slate-300 ${props.active === 'course'? "bg-slate-300":""}`}>
                                    <div className="p-1">Courses</div>
                                </Link>
                            </div>
                            <div className="flex w-2/6 justify-end gap-2">
                                <button className="home-btn p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg flex content-center justify-self-end font-semibold" onClick={_ => setShowLoginModal(true)}>
                                    <div className="p-1">Sign In</div>
                                </button>
                            </div>
                        </div>
                        {
                            showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} />
                        }
                    </div>
                )
            }
        </>
    )
}

export default Navbar