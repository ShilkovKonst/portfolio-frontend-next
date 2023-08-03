import { SocialMedia, NavDots } from '@/components'
import React, { ReactNode } from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

interface AppWrapProps {
    idName: string;
    classBG: string;
    classSection: string;
    children: ReactNode;
}

const AppWrap = <T extends {}>({ children, idName, classSection, classBG }: AppWrapProps & T) => function HOC() {
    return (
        <div id={idName} className={`app__container ${classBG}`}>
            <SocialMedia classDiv='app__social' />
            <div className="app__wrapper app__flex">
                {idName !== 'home'
                    ?
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: [50, 0], opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                        className={`${classSection} app__flex`}
                    >
                        {children}
                    </motion.div>
                    :
                    <div className={`${classSection} app__flex`}>
                        {children}
                    </div>
                }
                <div className='footer'>
                    {idName === 'contact' &&
                        <>
                            <SocialMedia classDiv='app__social-footer' />
                            <div className="copyright">
                                <p className="p-text">@2023 Konstantin Shilkov</p>
                                <p className="p-text">All rights reserved</p>
                            </div>
                        </>
                    }
                </div>
            </div>
            <NavDots active={idName} />
        </div>
    )
}
export default AppWrap