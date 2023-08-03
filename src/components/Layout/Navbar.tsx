'use client'
import React, { useState } from 'react'
import './Navbar.scss'
import Image from 'next/image'
import { images } from '@/constants'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { motion } from 'framer-motion'
import SmoothLink from '../SmoothLink'

const headers = [{ name: 'accueil', link: 'home' }, { name: 'à propos', link: 'about' }, { name: 'projets', link: 'work' }, { name: 'compétences', link: 'skills' }, { name: 'contact', link: 'contact' }]

const Navbar = () => {
    const [toggle, setToggle] = useState(false)

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        //remove everything before the hash
        const targetId = e.currentTarget.href.replace(/.*\#/, "");
        const elem = document.getElementById(targetId);
        const topPos = elem?.getBoundingClientRect().top
        topPos &&
            window.scrollTo({
                top: topPos + window.scrollY,
                behavior: "smooth",
            });
        setToggle(false)
    };
    
    return (
        <nav className='app__navbar'>
            <div className='app__navbar-logo'>
                <Image src={images.logo} alt="logo" />
            </div>
            <ul className='app__navbar-links'>
                {headers.map((el, index) => (
                    <li className='app__flex p-text' key={index}>
                        <SmoothLink href={`#${el.link}`} onClick={handleScroll}>{el.name}</SmoothLink>
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
                            {headers.map((el, index) => (
                                <li key={index}>
                                    <div />
                                    <SmoothLink href={`#${el.link}`} onClick={handleScroll}>{el.name}</SmoothLink>
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