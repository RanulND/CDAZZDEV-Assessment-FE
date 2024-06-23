import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteEnrollmentToStore, getEnrollments, updateEnrollmentToStore } from "../../store/features/enrollmentSlice";
import { Enrollment } from "../../types/enrollment";
import { toast } from "react-toastify";
import { updateEnrollment } from "../../services/enrollmentService";
import { getStudent } from "../../services/userService";

interface ExtendedEnrollment extends Enrollment {
    course: string
    username: string
}

type ModalProps = {
    enrollment: ExtendedEnrollment
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = {
    enrollment: Enrollment
}

const StudentViewModal = (props: ModalProps) => {
    const [editMode, setEditMode] = useState(false)
    const [completed, setCompleted] = useState(props.enrollment.completed)
    const dispatch = useAppDispatch()

    const onUpdate = () => {
        if (props.enrollment.enrollmentId) {
            let newEnrollment: Enrollment = {
                userId: props.enrollment.userId,
                courseId: props.enrollment.courseId,
                timestamp: props.enrollment.timestamp,
                completed: completed,
            }
            updateEnrollment({ id: props.enrollment.enrollmentId, data: newEnrollment }).then(res => {
                newEnrollment = { ...newEnrollment, enrollmentId: props.enrollment.enrollmentId }
                dispatch(updateEnrollmentToStore(newEnrollment))
                toast.success("update Successful")
                props.setShowModal(false)
            }).catch(err => {
                toast.error("Something went wrong!")
            })
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
                                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">User Details</h3>
                                                <div className="mt-6 items-center">
                                                    <div className="col-sm font-semibold text-sm">
                                                        Student Name
                                                    </div>
                                                    <div className="col-sm">
                                                        <span className="text-slate-600">{props.enrollment.username}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 items-center">
                                                    <div className="col-sm font-semibold text-sm">
                                                        Course Name :
                                                    </div>
                                                    <div className="col-sm">
                                                        <span className="text-slate-600">{props.enrollment.course}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 items-center">
                                                    <div className="col-sm font-semibold text-sm">
                                                        Completion :
                                                    </div>
                                                    <div className="col-sm">
                                                        {
                                                            editMode ?
                                                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 sm:ml-3 sm:w-auto" onClick={_ => { onUpdate() }}>Update</button>
                                                                :
                                                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 sm:ml-3 sm:w-auto" onClick={_ => { onUpdate() }}>Update</button>

                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        editMode ? (
                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 sm:ml-3 sm:w-auto" onClick={_ => { onUpdate() }}>Update</button>
                                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={_ => setEditMode(false)}>Discard</button>
                                            </div>
                                        ) : (
                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50 sm:ml-3 sm:w-auto ring-inset ring-1 ring-gray-300" onClick={_ => { props.setShowModal(false) }}>Close</button>
                                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-indogo-700 hover:bg-indigo-600 sm:mt-0 sm:w-auto" onClick={_ => setEditMode(true)}>Edit</button>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

const EnrollmentDetails = (props: Props) => {
    const [showModal, setShowModal] = useState(false)
    const [username, setUsername] = useState("")
    const [course, setCourse] = useState("")
    const dispatch = useAppDispatch()

    const onDelete = (id: string) => {
        dispatch(deleteEnrollmentToStore({ id: id }))
    }

    useEffect(() => {
        getStudent(props.enrollment.userId).then((res) => {
            setUsername(`${res.data.data.firstname} ${res.data.data.lastname}`)
        })
    }, [props.enrollment.userId])

    useEffect(() => {
        getStudent(props.enrollment.courseId).then((res) => {
            setCourse(`${res.data.data.name}`)
        })
    }, [props.enrollment.courseId])

    const extendedEnrollment: ExtendedEnrollment = {
        ...props.enrollment,
        course: course,
        username: username
    }

    return (
        <div className="flex items-center justify-between w-full py-2 border-t-2 px-6" key={props.enrollment.userId}>
            <div className="col-sm text-slate-600 md:w-3/12 lg:w-3/12">{username}</div>
            <div className="col-sm text-slate-600 md:w-3/12 lg:w-3/12">{course}</div>
            <div className="col-sm md:w-fit lg:w-1/12 px-1">
                <button className="bg-yellow-300 hover:bg-yellow-400 w-full rounded py-2 md:px-2 lg:px-0" onClick={_ => { setShowModal(true) }}>View</button>
            </div>
            <div className="col-sm md:w-fit lg:w-1/12 px-1">
                <button className="bg-red-500 hover:bg-red-600 rounded w-full py-2 text-white md:px-2 lg:px-0" onClick={_ => { onDelete(props.enrollment.enrollmentId ? props.enrollment.enrollmentId : "") }}>Delete</button>
            </div>
            {showModal && <StudentViewModal enrollment={extendedEnrollment} setShowModal={setShowModal} showModal={showModal} />}
        </div>
    )
}

const EnrollmentDashboard = () => {
    const dispatch = useAppDispatch()
    const { status, enrollments } = useAppSelector(state => state.enrollments)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getEnrollments())
        }
    }, [status, dispatch])

    return (
        <div className="border rounded-lg max-h-full overflow-y-scroll">
            <div className="flex items-center justify-between w-full pb-2 font-bold bg-slate-200 py-4 px-6">
                <div className="col-sm md:w-2/12 lg:w-3/12">Student Name</div>
                <div className="col-sm md:w-2/12 lg:w-3/12">Course Name</div>
                <div className="col-sm md:w-fit lg:w-1/12 md:px-3 lg:px-0">View</div>
                <div className="col-sm md:w-fit lg:w-1/12 md:px-3 lg:px-0">Delete</div>
            </div>
            {
                status === "succeeded" && enrollments.map(student => (
                    <EnrollmentDetails enrollment={student} key={student.userId} />
                ))
            }
        </div>
    )
}

export default EnrollmentDashboard