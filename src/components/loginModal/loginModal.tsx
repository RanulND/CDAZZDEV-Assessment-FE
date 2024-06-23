import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser, signin } from "../../services/userService";
import { setAccessToken } from "../../services/tokenService";
import { toast } from "react-toastify";
import { ROLES, User } from "../../types/user";
import { useNavigate } from "react-router-dom";

type Props = {
    setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>
}

type LoginData = {
    email: string
    password: string
    firstname: string
    lastname: string
}

const LoginModal = (props: Props) => {
    const [login, setLogin] = useState(true)
    const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm({
        defaultValues: {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            confirmPassword: ""
        }
    })
    const navigate = useNavigate()

    const signIn = (data: LoginData) => {
        if (login) {
            signin(data.email, data.password).then(res => {
                setAccessToken(res.data.data.token)
                toast.success("Login Successful!")
            }).catch(err => {
                toast.error(err.response.data.message)
            })
        } else {
            let newUser: User = {
                email: data.email,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname,
                role: ROLES.STUDENT
            }
            registerUser(newUser).then(res => {
                setAccessToken(res.data.data.token)
                    navigate("/admin")
            }).catch(err => {
                toast.error(err.response.data.message)
            })
        }

        props.setShowLoginModal(false)
    }
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                    <form className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" onSubmit={handleSubmit(signIn)}>
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-200 sm:mx-0 sm:h-10 sm:w-10">
                                    {
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                        </svg>
                                    }
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                        {login ?
                                            <>
                                                <div className="font-bold pb-2">Login</div>
                                                <span className="font-light"> <button className="text-sm font-semibold underline" onClick={_ => {
                                                    setLogin(false)
                                                    reset()
                                                    clearErrors()
                                                }}>Register</button> if you don't have an account</span>
                                            </> :
                                            <>
                                                <div className="font-bold pb-2">Register</div>
                                                <span className="font-light"> <button className="text-sm font-semibold underline" onClick={_ => {
                                                    setLogin(true)
                                                    reset()
                                                    clearErrors()
                                                }}>Login</button> if you already have an account</span>
                                            </>
                                        }
                                    </h3>
                                    <div className="mt-2">
                                        <div className="py-2">
                                            <div className="font-semibold">Email</div>
                                            <input type="text" className="rounded-lg border p-2"
                                                {...register("email", {
                                                    required: "Email is required",
                                                    validate: (email) => {
                                                        if (!email.includes("@")) {
                                                            return "Invalid Email"
                                                        }
                                                        return true
                                                    }
                                                })} />
                                            {errors.email && <div className="pt-1 text-red-600">{errors.email.message}</div>}
                                        </div>
                                        <div className="py-2">
                                            <div className="font-semibold">Password</div>
                                            <input type="password" className="rounded-lg border p-2" {...register("password", {
                                                required: "Password is required",
                                                validate: (password) => {
                                                    if ((password.length < 8)) {
                                                        return "Password should contain minimum of 8 characters"
                                                    }
                                                    return true
                                                }
                                            })} />
                                            {errors.password && <div className="pt-1 text-red-600">{errors.password.message}</div>}
                                        </div>
                                        {
                                            !login && (
                                                <>
                                                    <div className="py-2">
                                                        <div className="font-semibold">Confirm Password</div>
                                                        <input type="password" className="rounded-lg border p-2" {...register("confirmPassword", {
                                                            required: "Password is required",
                                                            validate: (confirmpassword, data) => {
                                                                if ((confirmpassword !== data.password)) {
                                                                    return "Passwords does not match"
                                                                }
                                                                return true
                                                            }
                                                        })} />
                                                        {errors.confirmPassword && <div className="pt-1 text-red-600">{errors.confirmPassword.message}</div>}
                                                    </div>
                                                    <div className="py-2">
                                                        <div className="font-semibold">First Name</div>
                                                        <input type="text" className="rounded-lg border p-2" {...register("firstname", {
                                                            required: "First name is required",
                                                        })} />
                                                        {errors.firstname && <div className="pt-1 text-red-600">{errors.firstname.message}</div>}
                                                    </div>
                                                    <div className="py-2">
                                                        <div className="font-semibold">Last Name</div>
                                                        <input type="text" className="rounded-lg border p-2" {...register("lastname", {
                                                            required: "Last name is required",
                                                        })} />
                                                        {errors.lastname && <div className="pt-1 text-red-600">{errors.lastname.message}</div>}
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            {
                                login ?
                                    <button type="submit" className="inline-flex w-full justify-center rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto">Login</button> :
                                    <button type="submit" className="inline-flex w-full justify-center rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto">Register</button>
                            }

                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={_ => props.setShowLoginModal(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginModal