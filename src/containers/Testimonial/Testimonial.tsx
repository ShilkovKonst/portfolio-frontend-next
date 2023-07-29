'use client'
import './Testimonial.scss'
import React, { useEffect, useState } from 'react'
import { AppWrap } from '@/wrapper'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client, urlFor } from '@/client'
import Image from 'next/image'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

interface testimonial {
  name: string,
  company: string,
  imageUrl: SanityImageSource,
  feedback: string
}

const Testimonial: React.FC = () => {
  const [testimonials, setTestimonials] = useState<testimonial[]>([])
  const [currIndex, setCurrIndex] = useState<number>(0)

  useEffect(() => {
    const queryTestimonials = `*[_type == 'testimonials']`
    client.fetch(queryTestimonials).then((data) => setTestimonials(data))
  }, [])

  return (
    <>
      {testimonials.length !== 0 && (
        <>
        <div className='app__testimonial-item app__flex'>
          <Image src={urlFor(testimonials[currIndex].imageUrl).url()} alt={testimonials[currIndex].company} width={200} height={100} />
          <div className='app__testimonial-content'>
            <p className='p-text'>{testimonials[currIndex].feedback}</p>
            <div>
              <h4 className='bold-text'>{testimonials[currIndex].company}</h4>
              <h5 className='p-text'>{testimonials[currIndex].name}</h5>
            </div>
          </div>
        </div>
        {/* {testimonials.length > 1 && ( */}
          <div className='app__testimonial-btns app__flex'>
            <div className='app__flex' onClick={() => setCurrIndex(currIndex == testimonials.length-1 ? 0 : currIndex + 1)}>
              <HiChevronLeft />
            </div>
            <div className='app__flex' onClick={() => setCurrIndex(currIndex == 0 ? testimonials.length-1 : currIndex - 1)}>
              <HiChevronRight />
            </div>
          </div>
        {/* )} */}
        </>
      )}
    </>
  )
}

export default AppWrap({ children: <Testimonial />, idName: 'testimonials', classBG: 'app__primarybg', classSection: 'app__testimonial' })