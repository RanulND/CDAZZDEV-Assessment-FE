import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { Course } from "../../types/course"
import { Enrollment } from "../../types/enrollment"
import { createEnrollment } from "../../services/enrollmentService"
import { addEnrollmentToStore } from "../../store/features/enrollmentSlice"
import { toast } from "react-toastify"
import { ROLES } from "../../types/user"

const backgrounds = [
    "bg-gradient-to-r from-cyan-500 to-blue-500",
    "bg-gradient-to-r from-sky-500 to-indigo-500",
    "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    "bg-gradient-to-r from-purple-500 to-pink-500",
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%",
]

type Props = {
    course: Course
}

type ModalProps = {
    course: Course
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    showModal: boolean
}

const CourseViewModal = (props: ModalProps) => {
    const dispatch = useAppDispatch()
    const { currentUser } = useAppSelector(state => state.auth)

    const onCreateEnr = () => {
        if(currentUser?.role === ROLES.ADMIN){
            toast.warn("Admin cannot enroll")
            return;
        }
        if (currentUser) {
            if (currentUser?.userId && props.course.courseId) {
                let newEnrollment: Enrollment = {
                    userId: currentUser.userId,
                    courseId: props.course.courseId,
                    timestamp: Date.now(),
                    completed: false
                }
                createEnrollment(newEnrollment).then(res => {
                    newEnrollment = { ...newEnrollment, enrollmentId: res.data.data.enrollmentId }
                    dispatch(addEnrollmentToStore(newEnrollment))
                    toast.success("Enrolled Successful")
                    props.setShowModal(false)
                }).catch(err => {
                    toast.error(err.response.data.message)
                })
            }
        }else{
            toast.error("Please log into enroll")
        }

    }

    return (
        <>
            {
                props.showModal && (
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-200 sm:mx-0 sm:h-10 sm:w-10">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="indigo" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Course Details</h3>
                                                <div className="mt-6 items-center">
                                                    <div className="col-sm font-semibold text-sm">
                                                        Course Name
                                                    </div>
                                                    <div className="col-sm">

                                                        <span className="text-slate-600">{props.course.name}</span>

                                                    </div>
                                                </div>
                                                <div className="mt-2 items-center">
                                                    <div className="col-sm font-semibold text-sm">
                                                        Tutor Name :
                                                    </div>
                                                    <div className="col-sm">
                                                        <span className="text-slate-600">{props.course.tutor}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 items-center">
                                                    <div className="col-sm font-semibold text-sm">
                                                        Mode
                                                    </div>
                                                    <div className="col-sm"><span className="text-slate-600">{props.course.mode}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="button" className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50 sm:ml-3 sm:w-auto ring-inset ring-1 ring-gray-300" onClick={_ => { props.setShowModal(false) }}>Close</button>
                                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-indogo-700 hover:bg-indigo-600 sm:mt-0 sm:w-auto" onClick={_ => { onCreateEnr() }}>Enroll</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

const Card = (props: Props) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="h-64 my-4 rounded-lg border">
            <div className={`h-2/3 rounded-t-lg ${backgrounds[Math.floor(Math.random() * 100) % 6]}`}></div>
            <div className="h-1/3 flex p-1 items-center">
                <div className="w-5/6 text-start font-semibold">{props.course.name}</div>
                <div className="w-1/6">
                    <button className="btn p-2 rounded-lg bg-yellow-300 hover:bg-yellow-400" onClick={_ => setShowModal(true)}>View</button>
                </div>
            </div>
            <CourseViewModal setShowModal={setShowModal} showModal={showModal} course={props.course} key={props.course.courseId} />
        </div>
    )
}

export default Card