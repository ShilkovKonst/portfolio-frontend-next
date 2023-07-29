'use client'
import './About.scss'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { client, urlFor } from '@/client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { AppWrap } from '@/wrapper'

interface Abouts {
  title: string,
  description: string,
  imgUrl: SanityImageSource
}

// const abouts = [
//   { title: 'Frontend', description: 'I\'m good in Frontend', imgUrl: images.about01 },
//   { title: 'Backend', description: 'I\'m good in Backend', imgUrl: images.about02 },
//   { title: 'Fullstack', description: 'I\'m good in Fullstack', imgUrl: images.about03 },
// ]

const About: React.FC = () => {
  const [abouts, setAbouts] = useState<Abouts[]>()

  useEffect(() => {
      const query = `*[_type == "abouts"]`
      client.fetch(query).then((data) => setAbouts(data))
  }, [])

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
            <Image src={urlFor(el.imgUrl).url()} width={1200} height={900} alt={el.title} />
            {/* <Image src={el.imgUrl} alt={el.title} /> */}
            <h2 className='bold-text' style={{ marginTop: '20px' }}>{el.title}</h2>
            <p className='p-text' style={{ marginTop: '10px' }}>{el.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap({children: <About/>, idName: 'about', classNames: ''})