import { SocialMedia, NavDots } from '@/components'
import React, { ReactNode } from 'react'

interface AppWrapProps {
    idName: string;
    classNames: string;
    children: ReactNode;
}

const AppWrap = <T extends {}>({children, idName, classNames }:AppWrapProps & T) => function HOC() {
    return (
        <div id={idName} className={`app__container ${classNames}`}>
            <SocialMedia />
            <div className="app__wrapper app__flex">
                {children}
                <div className="copyright">
                    <p className="p-text">@2020 MICHAEL</p>
                    <p className="p-text">All rights reserved</p>
                </div>
            </div>
            <NavDots active={idName} />
        </div>
    )
}
export default AppWrap