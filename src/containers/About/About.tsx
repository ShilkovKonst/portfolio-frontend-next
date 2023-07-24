'use client'
import './About.scss'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import { images } from '@/constants'
import { client } from '@/client'

interface Abouts {
  title: string,
  description: string,
  imgUrl: StaticImageData
}

const abouts = [
  { title: 'Frontend', description: 'I\'m good in Frontend', imgURL: images.about01 },
  { title: 'Backend', description: 'I\'m good in Backend', imgURL: images.about02 },
  { title: 'Fullstack', description: 'I\'m good in Fullstack', imgURL: images.about03 },
]

const About = () => {
  const [abouts, setAbouts] = useState<[Abouts]>()

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
            <Image src={el.imgUrl} alt={el.title} />
            <h2 className='bold-text' style={{ marginTop: '20px' }}>{el.title}</h2>
            <p className='p-text' style={{ marginTop: '10px' }}>{el.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default About