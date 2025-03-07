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

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name != '' && email != '' && message != '') {
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
  }

  return (
    <>
      <h2 className='head-text'>Contactez-Moi</h2>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <Image src={images.mail} alt='mail' width={512} height={512} />
          <Link className='p-text' href='mailto: konst.shilkov@gmail.com'>
            via Email: konst.shilkov@gmail.com
          </Link>
        </div>
        <div className='app__footer-card'>
          <Image src={images.phone} alt='phone' width={512} height={512} />
          <Link className='p-text' href='tel: +33668476320'>
            via Phone: +33 6 68 47 63 20
          </Link>
        </div>
      </div>
      {!isSubmitted ?
        <form onSubmit={handleSubmit} className='app__footer-form app__flex'>
          <h4 className='subhead-text'>Ou en utilisant cette forme</h4>
          <div className='app__flex'>
            <input className='p-text' required type="text" placeholder='Votre nom' name='name' value={name} onChange={handleChangeInput} />
          </div>
          <div className='app__flex'>
            <input className='p-text' required type="text" placeholder='Votre email' name='email' value={email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea className='p-text' required placeholder='Votre message' name="message" value={message} onChange={handleChangeInput} />
          </div>
          <button type='submit'>{isLoading ? 'Envoi en cours...' : 'Envoyer le message'}</button>
        </form>
        :
        <div>
          <h3 className='head-text'>{`Merci, ${name}, pour me contacter!`}</h3>
        </div>
      }

    </>
  )
}

export default AppWrap({ children: <Footer />, idName: 'contact', classBG: 'app__primarybg', classSection: 'app__footer' })