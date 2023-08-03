'use client'
import React, { useEffect, useState } from 'react'
import { AppWrap } from '@/wrapper'
import { motion } from 'framer-motion'
import { client, urlFor } from '@/client'
import Image from 'next/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import './Skills.scss'
import Link from 'next/link'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

interface testimonial {
  name: string,
  company: string,
  imageUrl: SanityImageSource,
  feedback: string
}

interface brand {
  imgUrl: SanityImageSource,
  name: string
}

interface animate {
  x: number[],
  opacity: number[],
}

interface experience {
  year: string,
  works: workExp[]
}

interface workExp {
  name: string,
  company: string,
  description: string,
  link: string
}

const Skills: React.FC = () => {
  const [exps, setExps] = useState<experience[]>([])
  const [testimonials, setTestimonials] = useState<testimonial[]>([])
  const [currIndex, setCurrIndex] = useState<number>(0)
  const [animate, setAnimate] = useState<animate>({ x: [0], opacity: [1] })

  const [brands, setBrands] = useState<brand[]>([]);

  const handleTestimonialSwitcherRight = (index: number) => {
    setAnimate({ x: [-300], opacity: [0] })
    setTimeout(() => {
      setAnimate({ x: [0], opacity: [0] })
      setTimeout(() => {
        setCurrIndex(index)
        setAnimate({ x: [0], opacity: [1] })
      }, 300);
    }, 300);
  }
  const handleTestimonialSwitcherLeft = (index: number) => {
    setAnimate({ x: [300], opacity: [0] })
    setTimeout(() => {
      setAnimate({ x: [0], opacity: [0] })
      setTimeout(() => {
        setCurrIndex(index)
        setAnimate({ x: [0], opacity: [1] })
      }, 300)
    }, 300)
  }

  useEffect(() => {
    const queryExps = '*[_type == "experiences"]'
    const queryTestimonials = `*[_type == 'testimonials']`
    const brandsQuery = '*[_type == "brands"]'
    client.fetch(queryExps).then((data) => setExps(data))
    client.fetch(queryTestimonials).then((data) => setTestimonials(data))
    client.fetch(brandsQuery).then((data) => setBrands(data))
  }, [])

  return (
    <>
      <h2 className='head-text'>Expérience &{' '}
        <span>Témoignage</span>
      </h2>
      <div className='app__skills-container'>
        <div className='app__skills-exp'>
          {exps.map((exp, i) => (
            <div className='app__skills-exp-item' key={i}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{exp.year}</p>
                <div>
                  {exp?.works?.map((work, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className='app__skills-exp-work'
                    >
                      <h4 className='bold-text'>{work.name}</h4>
                      <Link href={work.link} target='_blank' className='p-text'>{work.company}</Link>
                      <p className='p-text'>{work.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
        <div className='app__testimonial'>
          {testimonials.length !== 0 && (
            <>
              <motion.div
                animate={animate}
                transition={{ duration: 0.3, delayChildren: 0.3 }}
                className='app__testimonial-item'
              >
                <div className='app__testimonial-content'>
                  <p className='p-text'>{testimonials[currIndex].feedback}</p>
                  
                </div>
                <div className='app__testimonial-footer'>
                    <h4 className='bold-text'>{testimonials[currIndex].company}</h4>
                    <h5 className='p-text'>{testimonials[currIndex].name}</h5>
                </div>
              </motion.div>
              {testimonials.length > 1 && (
                <div className='app__testimonial-btns app__flex'>
                  <div className='app__flex'
                    onClick={() => handleTestimonialSwitcherLeft(currIndex == testimonials.length - 1 ? 0 : currIndex + 1)}
                  >
                    <HiChevronLeft />
                  </div>
                  <div className='app__flex'
                    onClick={() => handleTestimonialSwitcherRight(currIndex == 0 ? testimonials.length - 1 : currIndex - 1)}
                  >
                    <HiChevronRight />
                  </div>
                </div>
              )}
              <div className="app__testimonial-brands app__flex">
                {brands?.map((brand, i) => (
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5, type: 'tween' }}
                    key={i}
                  >
                    <Image src={urlFor(brand.imgUrl).url()} alt={brand.name} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default AppWrap({ children: <Skills />, idName: 'skills', classBG: 'app__whitebg', classSection: 'app__skills' })