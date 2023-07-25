import Link from 'next/link'
import React from 'react'

interface NavDotsProps {
    active: string
}

const NavDots = ({ active }: NavDotsProps) => {
    return (
        <div className='app__navigation'>
            {['home', 'about', 'skills', 'testimonials', 'contact'].map((el, index) => (
                <Link
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