import { SocialMedia, NavDots } from '@/components'
import React, { ReactNode } from 'react'
import { motion } from 'framer-motion';

interface AppWrapProps {
    idName: string;
    classBG: string;
    classSection: string;
    children: ReactNode;
}

const AppWrap = <T extends {}>({ children, idName, classSection, classBG }: AppWrapProps & T) => function HOC() {
    return (
        <div id={idName} className={`app__container ${classBG}`}>
            <SocialMedia />
            <div className="app__wrapper app__flex">
                {idName === 'home'
                    ?
                    <motion.div
                        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
                        transition={{ duration: 0.5 }}
                        className={`${classSection} app__flex`}
                    >
                        {children}
                    </motion.div>
                    :
                    <div className={`${classSection} app__flex`}>
                        {children}
                    </div>}
                <div className="copyright">
                    <p className="p-text">@2023 Konstantin Shilkov</p>
                    <p className="p-text">All rights reserved</p>
                </div>
            </div>
            <NavDots active={idName} />
        </div>
    )
}
export default AppWrap