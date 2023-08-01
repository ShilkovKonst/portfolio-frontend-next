'use client'
import React, { TextareaHTMLAttributes, useState } from 'react'
import './Footer.scss'
import { AppWrap } from '@/wrapper'
import Image from 'next/image'
import { images } from '@/constants'
import Link from 'next/link'
import { client } from '@/client'

interface formData {
  name: string,
  email: string,
  message: string
}

const Footer = () => {
  const [formData, setFormData] = useState<formData>({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { name, email, message } = formData

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    client.create(contact).then(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    })
  }

  return (
    <>
      <h2 className='head-text'> Contact me</h2>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <Image src={images.mail} alt='mail' width={512} height={512} />
          <Link className='p-text' href='mailto: konst.shilkov@gmail.com'>
            by Email: konst.shilkov@gmail.com
          </Link>
        </div>
        <div className='app__footer-card'>
          <Image src={images.phone} alt='phone' width={512} height={512} />
          <Link className='p-text' href='tel: +33668476320'>
            by Phone: +33 6 68 47 63 20
          </Link>
        </div>
      </div>
      {!isSubmitted ?
        <form className='app__footer-form app__flex'>
          <div className='app__flex'>
            <input className='p-text' type="text" placeholder='Your name' name='name' value={name} onChange={handleChangeInput} />
          </div>
          <div className='app__flex'>
            <input className='p-text' type="text" placeholder='Your email' name='email' value={email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea className='p-text' placeholder='Your message' name="message" value={message} onChange={handleChangeInput} />
          </div>
          <button type='button' onClick={handleSubmit}>{isLoading ? 'Sending...' : 'Send message'}</button>
        </form>
        :
        <div>
          <h3 className='head-text'>{`Thank you, ${name}, for contact me!`}</h3>
        </div>
      }

    </>
  )
}

export default AppWrap({ children: <Footer />, idName: 'contact', classBG: 'app__whitebg', classSection: 'app__footer' })