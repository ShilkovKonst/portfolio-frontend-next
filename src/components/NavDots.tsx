import React from 'react'
import SmoothLink from './SmoothLink'

interface NavDotsProps {
    active: string
}

const NavDots = ({ active }: NavDotsProps) => {
    return (
        <div className='app__navigation'>
            {['home', 'about', 'work', 'skills', 'contact'].map((el, index) => (
                <SmoothLink
                    key={index}
                    href={`#${el}`}
                    className='app__navigation-dot'
                    style={active === el ? {backgroundColor: '#313BAC'} : {}}
                />
            ))}
        </div>
    )
}

export default NavDots