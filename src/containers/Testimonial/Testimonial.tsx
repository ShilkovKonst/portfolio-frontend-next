'use client'
// import './Testimonial.scss'
import React, { useEffect, useState } from 'react'
import { AppWrap } from '@/wrapper'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client, urlFor } from '@/client'
import Image from 'next/image'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { motion } from 'framer-motion'

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

const Testimonial: React.FC = () => {
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
    const queryTestimonials = `*[_type == 'testimonials']`
    client.fetch(queryTestimonials).then((data) => setTestimonials(data))
    const brandsQuery = '*[_type == "brands"]'
    client.fetch(brandsQuery).then((data) => setBrands(data))
  }, [])

  return (
    <>
      {testimonials.length !== 0 && (
        <>
          <motion.div
            animate={animate}
            transition={{ duration: 0.3, delayChildren: 0.3 }}
            className='app__testimonial-item app__flex'
          >
            <Image src={urlFor(testimonials[currIndex].imageUrl).url()} alt={testimonials[currIndex].company} width={200} height={100} />
            <div className='app__testimonial-content'>
              <p className='p-text'>{testimonials[currIndex].feedback}</p>
              <div>
                <h4 className='bold-text'>{testimonials[currIndex].company}</h4>
                <h5 className='p-text'>{testimonials[currIndex].name}</h5>
              </div>
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
    </>
  )
}

export default AppWrap({ children: <Testimonial />, idName: 'testimonials', classBG: 'app__primarybg', classSection: 'app__testimonial' })