'use client'
import React, { useState } from 'react'
import './Navbar.scss'
import Image from 'next/image'
import { images } from '@/constants'
import Link from 'next/link'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { motion } from 'framer-motion'

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <nav className='app__navbar'>
            <div className='app__navbar-logo'>
                <Image src={images.logo} alt="logo" />
            </div>
            <ul className='app__navbar-links'>
                {['home', 'about', 'skills', 'contact'].map((el, index) => (
                    <li className='app__flex p-text' key={index}>
                        <Link href={`#${el}`}>{el}</Link>
                        <div />
                    </li>
                ))}
            </ul>
            <div className='app__navbar-menu'>
                <HiMenuAlt4 onClick={() => setToggle(true)} />
                {toggle && (
                    <motion.div
                        className='menu'
                        initial={{ opacity: 0 }}
                        whileInView={{ x: [200, 0], opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <HiX onClick={() => setToggle(false)} />
                        <ul>
                            {['home', 'about', 'skills', 'contact'].map((el, index) => (
                                <li key={index}>
                                    <div />
                                    <Link href={`#${el}`} onClick={() => setToggle(false)}>{el}</Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </div>
        </nav>
    )
}

export default Navbar