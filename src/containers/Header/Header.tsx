'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { images } from '@/constants'
import './Header.scss'
import Image from 'next/image'

const Header = () => {

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
    <div id='home' className='app__header app__flex'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ x: [-100, 0], opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='app__header-info'
      >
        <div className='app__header-badge'>
          <div className='badge-cmp app__flex'>
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className='p-text'>Hello, I am</p>
              <h1 className='head-text'>Konstantin</h1>
            </div>
          </div>
          <div className='tag-cmp app__flex'>
            <p className='p-text'>Fullstack Web Developer</p>
            <p className='p-text'>In search of alternance</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__header-img'
      >
        <Image src={images.profile} alt='profile' />
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
        {[images.flutter, images.redux, images.sass].map((img, index) => (
          <div className='corcle-cmp app__flex' key={index}>
            <Image src={img} alt={`img${index}`} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Header