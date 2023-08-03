'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { images } from '@/constants'
import './Header.scss'
import Image from 'next/image'
import { AppWrap } from '@/wrapper'

const Header: React.FC = () => {

  const scaleVariants = {
    whileInView: {
      scale: [0, 1],
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ x: [-100, 0], opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='app__header-info'
      >
        <div className='app__header-badge'>
          <div className='badge-cmp app__flex'>
            <div style={{ marginLeft: 20 }}>
              <p className='p-text'>Salut, je m&#39;appelle</p>
              <h1 className='head-text'>Konstantin</h1>
            </div>
          </div>
          <div className='tag-cmp app__flex'>
            <p className='p-text'>Développeur Web Fullstack</p>
            <p className='p-text'>En recherche d&#39;alternance</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__header-img'
      >
        <Image src={images.profile} alt='profile' width={500} />
        <motion.div
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className='overlay_circle'
        >
          <Image src={images.circle} alt='' />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className='app__header-circles'
      >
        {[images.html, images.javascript, images.css].map((img, index) => (
          <div className='corcle-cmp app__flex' key={index}>
            <Image src={img} alt={`img${index}`} />
          </div>
        ))}
      </motion.div>
    </>
  )
}

export default AppWrap({children: <Header />, idName:'home', classBG: 'app_primarybg', classSection: 'app__header'})