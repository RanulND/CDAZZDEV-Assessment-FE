import React, { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { TiThMenuOutline } from "react-icons/ti"
import { LuMessageSquarePlus } from "react-icons/lu"
import "./adminSidebar.css"
import { ActivePage } from "../../types/admin";

type Props = {
    active: number
    setActive: React.Dispatch<React.SetStateAction<ActivePage>>
}
const AdminSidebar = (props: Props) => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <Sidebar collapsed={collapsed} className="h-screen sidebar bg-slate-300 text-dark" onBackdropClick={() => setCollapsed(true)} width="280px">
            <Menu className="pt-4">
                <MenuItem className="pb-6 text-start" icon={<TiThMenuOutline color="#000" size={20} className="" />} onClick={_ => setCollapsed(!collapsed)}>
                    <span className="menu-item uppercase font-bold">cdazzdev</span>
                </MenuItem>
                <MenuItem icon={<LuMessageSquarePlus color="#000" size={20} />} className={`text-start my-4 ${props.active === 0 ? "active" : ""}`} onClick={_ => props.setActive(ActivePage.LANDING)}>
                    <span className="menu-item">Admin Panel</span>
                </MenuItem>
                <MenuItem icon={<LuMessageSquarePlus color="#000" size={20} />} className={`text-start my-4 ${props.active === 1 ? "active" : ""}`} onClick={_ => props.setActive(ActivePage.STUDENT_DB)}>
                    <span className="menu-item">Student Dashboard</span>
                </MenuItem>
                <MenuItem icon={<LuMessageSquarePlus color="#000" size={20} />} className={`text-start my-4 ${props.active === 2 ? "active" : ""}`} onClick={_ => props.setActive(ActivePage.COURSE_DB)}>
                    <span className="menu-item">Course Dashboard</span>
                </MenuItem>
                <MenuItem icon={<LuMessageSquarePlus color="#000" size={20} />} className={`text-start my-4 ${props.active === 3 ? "active" : ""}`} onClick={_ => props.setActive(ActivePage.ENROLLMENT_DB)}>
                    <span className="menu-item">Enrollment Dashboard</span>
                </MenuItem>
            </Menu>
        </Sidebar>
    );
};

export default AdminSidebar
