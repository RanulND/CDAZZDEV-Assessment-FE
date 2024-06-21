import React, { useState } from "react";
import AdminSidebar from "../../components/adminSidebar/adminSidebar";
import AdminNavbar from "../../components/adminNavbar/adminNavbar";
import AdminLanding from "../../components/adminLanding/adminLanding";
import StudentDashboard from "../../components/studentDashboard/studentDashboard";
import CourseDashboard from "../../components/courseDashbaord/courseDashbaord";
import EnrollmentDashboard from "../../components/enrollmentDashboard/enrollmentDashboard";
import { ActivePage } from "../../types/admin";

const Admin = () => {
    const [active, setActive] = useState(ActivePage.LANDING)

    return (
        <div className="chat h-screen flex bg-slate-800 overflow-y-hidden">
            <div>
                <AdminSidebar active={active} setActive={setActive} />
            </div>
            <div className="flex flex-col w-full">
                <div className="h-16 content-end shadow">
                    <AdminNavbar />
                </div>
                <div className="h-full px-24">
                    <div className="h-5/6 flex flex-col text-start content-start chat-content pt-6">
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
                </div>
            </div>
        </div>
    )
}

export default Admin