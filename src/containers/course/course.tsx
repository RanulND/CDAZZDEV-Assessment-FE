import { useEffect } from "react"
import Card from "../../components/courseCards/card"
import Navbar from "../../components/navbar/navbar"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getCourses } from "../../store/features/courseSlice"

const Courses = () => {
    const dispatch = useAppDispatch()
    const { courses, status } = useAppSelector(state => state.courses)

    useEffect(() => {
        if (status === "idle") {
            dispatch(getCourses())
        }
    }, [status, dispatch])

    return (
        <div>
            <Navbar active={"course"} />
            <div className="md:px-24 px-4 grid lg:grid-cols-3 sm:grid-cols-2 gap-3">
                {
                    courses.map(course => (
                        <Card course={course} key={course.courseId}  />
                    ))
                }

            </div>
        </div>
    )
}

export default Courses