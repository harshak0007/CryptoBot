import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Footer } from "../index"

const Signup = ({ setActiveComponent, notifyError, notifySuccess }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const handleFormFieldChange = (fieldName, e) => {
        setUser({ ...user, [fieldName]: e.target.value })
    }

    const createAccount = async (e) => {
        e.preventDefault();
        if (user.name == "" || user.email == "" || user.password == "" || user.passwordConfirm == "") {
            return notifyError("Please provide all details")
        }
        notifySuccess("Wait creating account....")

        try {
            // API call
            const response = await axios({
                method: "POST",
                url: `/signup`,
                withCredentials: true,
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    passwordConfirm: user.passwordConfirm
                }
            })

            console.log(response)
            if (response.data.status == "success") {
                notifySuccess("Account Created Succesfully");
                localStorage.setItem("USER_MEMBERSHIP", response.data.data.user.membershipType
                )
                localStorage.setItem("CryptoBot_BackEnd", response.data.data.user._id)
                localStorage.setItem("CryptoAUT_TOKEN", response.data.token)
                window.location.reload();
            } else {
                notifyError("Something went wrong,try again later")
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='techwave_fn_sign'>
            <div className='sign__content'>
                <h1 className='logo'>Designed by Harshak </h1>
                <form className='login'>
                    <div className='form__content'>
                        <div className='form__title'>Sign Up</div>
                        <div className='form__username'>
                            <label htmlFor='user_login'>Name</label>
                            <input type='text' className='input' onChange={(e) => handleFormFieldChange("name", e)}>
                            </input>
                        </div>
                        <div className='form__username'>
                            <label htmlFor='user_login'>Email</label>
                            <input type='text' className='input' onChange={(e) => handleFormFieldChange("email", e)}>
                            </input>
                        </div>
                        <div className='form__username'>
                            <label htmlFor='user_password'>Password</label>
                            <input type='text' className='input' onChange={(e) => handleFormFieldChange("password", e)}>
                            </input>
                        </div>
                        <div className='form__username'>
                            <label htmlFor='user_login'>Confirm Password</label>
                            <input type='text' className='input' onChange={(e) => handleFormFieldChange("passwordConfirm", e)}>
                            </input>
                        </div>

                        <div className='form__alternative'>
                            <a onClick={(e) => { createAccount(e) }} className='techwave_fn_button'>
                                <span>Create Account</span>
                            </a>
                        </div>
                    </div>
                </form>

                <div className='sign__desc'>
                    <p>Not a member?
                        <a onClick={() => setActiveComponent("Login")}>Login</a>
                    </p>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Signup
