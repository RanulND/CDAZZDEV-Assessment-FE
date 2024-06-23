import React, { useLayoutEffect, useState } from "react";
import AdminSidebar from "../../components/adminSidebar/adminSidebar";
import Navbar from "../../components/navbar/navbar";
import AdminLanding from "../../components/adminLanding/adminLanding";
import StudentDashboard from "../../components/studentDashboard/studentDashboard";
import CourseDashboard from "../../components/courseDashbaord/courseDashbaord";
import EnrollmentDashboard from "../../components/enrollmentDashboard/enrollmentDashboard";
import { ActivePage } from "../../types/admin";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { ROLES } from "../../types/user";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [active, setActive] = useState(ActivePage.LANDING)
    const { currentUser } = useAppSelector(state => state.auth)
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (currentUser?.role !== ROLES.ADMIN) {
            navigate("/")
        }
    }, [])
    return (
        <div className="chat h-screen flex bg-white overflow-y-hidden">
            <div>
                <AdminSidebar active={active} setActive={setActive} />
            </div>
            <div className="flex flex-col w-full">
                <Navbar active={"admin"} />
                <div className="h-5/6 lg:px-24 px-4">
                    <div className="h-full flex flex-col text-start content-start chat-content pt-6 md:block hidden">
                        {
                            active === 0 && <AdminLanding />
                        }
                        {
                            active === 1 && <StudentDashboard />
                        }
                        {
                            active === 2 && <CourseDashboard />
                        }
                        {
                            active === 3 && <EnrollmentDashboard />
                        }
                    </div>
                    <div className="h-full w-full flex justify-center ps-24 pe-12 items-center text-center block md:hidden">
                        <div>
                            <svg className="h-20 w-20 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <div className="text-center text-red-400 font-semibold">This UI is supported by Desktops. Please switch onto a desktop to view the app</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin