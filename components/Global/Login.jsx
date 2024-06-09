import React, { useState, useEffect } from 'react';

import { Footer } from "../index"
const Login = ({ axios, setActiveComponent, notifyError, notifySuccess }) => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const handleFormFieldChange = (fieldName, e) => {
        setUser({ ...user, [fieldName]: e.target.value })
    }

    const apiLogin = async (e) => {
        e.preventDefault();
        if (user.password == "") {
            return notifyError("Please provide Email and Password")
        }
        notifySuccess("Wait Login into  account....")

        try {
            // API call
            const response = await axios({
                method: "POST",
                url: `/login`,
                withCredentials: true,
                data: {
                    email: user.email,
                    password: user.password,
                }
            })

            if (response.data.status == "success") {
                notifySuccess("Account  Succesfully");
                localStorage.setItem("USER_MEMBERSHIP", response.data.data.membershipType)
                localStorage.setItem("CryptoBot_BackEnd", response.data.data.user._id)
                localStorage.setItem("CryptoAUT_TOKEN", response.data.token)
                window.location.reload();
            } else if (response.data.status == "fail") {
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
                        <div className='form__title'>Login</div>

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

                        <div className='form__alternative'>
                            <a onClick={(e) => { apiLogin(e) }} className='techwave_fn_button'>
                                <span>Login In</span>
                            </a>
                        </div>
                    </div>
                </form>

                <div className='sign__desc'>
                    <p>Not a member?
                        <a onClick={() => setActiveComponent("SignUp")}>Login</a>
                    </p>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Login
