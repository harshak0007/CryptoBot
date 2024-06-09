import React, { useState } from 'react'

import { Footer } from "../index"
const Home = () => {
    return (
        <div className='techwave_fn_content'>
            <div className='techwave_fn_page'>
                <div className='techwave_fn_home'>
                    <div className='section_home'>
                        <div className='section_left'>
                            <div className='techwave_fn_title_holder'>
                                <h1 className='title'>Automate Your Crypto Trading</h1>

                                <p className='desc'>Crypto Trading Financial Bot for Buying and Sell Crypto
                                </p>
                            </div>

                            <div className='techwave_fn_interactive_list'>
                                <ul>
                                    <li>
                                        <div className='item'>
                                            <a>
                                                <span className='icon'>
                                                    <img src='img/lighticon/light-19.png' className='fn__svg'></img>
                                                </span>
                                                <h2 className='title'>Buy Any Token</h2>
                                                <p className='desc'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, hic officia eveniet autem distinctio minus expedita, reprehenderit impedit excepturi corporis sit quaerat!
                                                </p>
                                                <span className='arrow'>
                                                    <img src='img/lighticon/light-22.png' className='fn__svg' alt=''></img>
                                                </span>
                                            </a>
                                        </div>
                                    </li>

                                    <li>
                                        <div className='item'>
                                            <a>
                                                <span className='icon'>
                                                    <img src='img/lighticon/light-16.png'></img>
                                                </span>
                                                <h2 className='title'>Sell Any Token</h2>
                                                <p className='desc'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, hic officia eveniet autem distinctio minus expedita, reprehenderit impedit excepturi corporis sit quaerat!
                                                </p>
                                                <span className='arrow'>
                                                    <img src='img/lighticon/light-22.png' className='fn__svg' alt=''></img>
                                                </span>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>



                        <div className='section_right'>
                            <div className='company_info'>
                                <img src='img/light-logo.png'></img>
                                <p className='fn__animated_text'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam deserunt error minus, dolores sequi voluptatum commodi soluta minima quaerat excepturi. In tempore itaque id alias debitis ullam tenetur quia amet.
                                </p>
                                <hr></hr>
                                <div className='fn__members'>
                                    <div className='active item'>
                                        <span className='circle'></span>
                                        <span className='text'>111111 Online</span>
                                    </div>
                                    <div className='item'>
                                        <span className='circle'></span>
                                        <span className='text'>239291978 Members</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <Footer />
        </div>
    )
}

export default Home

