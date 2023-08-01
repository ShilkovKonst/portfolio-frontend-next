'use client'
import './About.scss'
import React, { ReactNode, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { client, urlFor } from '@/client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { AppWrap } from '@/wrapper'

interface Span {
  _key: string,
  _type: 'span',
  marks: string[],
  text: string
}

interface Block {
  _key: string,
  _type: 'block',
  children: ReactNode[],
  markDefs: any[],
  level: number,
  listItem: string,
  sryle: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
}

interface Abouts {
  title: string,
  description: string[],
  imgUrl: SanityImageSource
}

const About: React.FC = () => {
  const [abouts, setAbouts] = useState<Abouts[]>()

  useEffect(() => {
    const query = `*[_type == "abouts"]`
    client.fetch(query).then((data) => setAbouts(data))
  }, [])
  console.log(abouts)

  return (
    <>
      <h2 className='head-text'>
        I know that{' '}
        <span>Good Apps</span>
        <br />
        Means{' '}
        <span>Good Business</span>
      </h2>
      <div className='app__profiles'>
        {abouts?.map((el, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className='app__profile-item'
          >
            <Image src={urlFor(el.imgUrl).url()} width={960} height={540} alt={el.title} />
            <h2 className='bold-text' style={{ marginTop: '20px' }}>{el.title}</h2>
            {el.description?.map((el, i) => (
              <p key={i} className='p-text' style={{ marginTop: '10px' }}>{el}</p>
            ))}

          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap({ children: <About />, idName: 'about', classBG: 'app__whitebg', classSection: 'app__about' })