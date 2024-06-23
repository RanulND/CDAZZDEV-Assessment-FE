import React from "react";

type Props = {
    color: string,
    count: number
}
const Card = (props: Props) => {
    return (
        <div className={`rounded-lg h-1/4 w-1/3 ${props.color}`}>
            <div className={`text-start h-2/5 p-4 content-start font-semibold text-3xl text-slate-200 rounded-t-lg ${props.color}`}>Users</div>
            <div className="text-end h-3/5 p-4 content-end text-5xl font-bold text-slate-700">{props.count}</div>
        </div>
    )
}

const AdminLanding = () => {

    return (
        <div className="h-full flex gap-6">
            <Card color="bg-gradient-to-r from-cyan-500 to-blue-500" count={300} />
            <Card color="bg-gradient-to-r from-sky-500 via-30% to-emerald-500 to-90%" count={300} />
            <Card color="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" count={300} />
        </div>
    )
}

export default AdminLanding