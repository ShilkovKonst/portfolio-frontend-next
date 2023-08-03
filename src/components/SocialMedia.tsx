import Link from 'next/link'
import React from 'react'
import { BsTwitter, BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'

interface SocialMediaProps {
    classDiv: string
}

const SocialMedia = ({ classDiv }: SocialMediaProps) => {
    return (
        <div className={classDiv}>
            <Link href='https://www.linkedin.com/in/konstantin-shilkov/' target='_blank'>
                <BsLinkedin />
            </Link>
            <Link href='https://github.com/ShilkovKonst' target='_blank'>
                <BsGithub />
            </Link>
            <Link href='https://www.facebook.com/profile.php?id=100004358345768' target='_blank'>
                <FaFacebookF />
            </Link>
        </div>
    )
}

export default SocialMedia