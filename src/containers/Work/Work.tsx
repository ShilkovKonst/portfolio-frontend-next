'use client'
import React, { useEffect, useState } from 'react'
import './Work.scss'
import { AiFillEye, AiFillGithub } from 'react-icons/ai'
import { AppWrap } from '@/wrapper'
import { motion } from 'framer-motion'
import { client, urlFor } from '@/client'
import Image from 'next/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Link from 'next/link'

interface animateCard {
  y: number,
  opacity: number,
}

interface work {
  title: string,
  description: string,
  projectLink: string,
  codeLink: string,
  imgUrl: SanityImageSource,
  tags: string[]
}

const Work: React.FC = () => {

  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [animateCard, setAnimateCard] = useState<animateCard>({ y: 0, opacity: 1 })
  const [works, setWorks] = useState<work[]>([])
  const [filterWorks, setFilterWorks] = useState<work[]>([])
  const [tags, setTags] = useState<string[]>([])

  const handleWorkFilter = (tag: string) => {
    setActiveFilter(tag)
    setAnimateCard({ y: 100, opacity: 0 })
    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 })
      if (activeFilter === 'All') setFilterWorks(works)
      else {
        const filtered = works.filter((work: work) => work.tags.includes(tag))
        setFilterWorks(filtered)
      }
    }, 500);
  }

  useEffect(() => {
    const query = '*[_type == "works"]'
    client.fetch(query).then((data) => {
      setWorks(data)
      setFilterWorks(data)
      const rawTags = data.map((el: work) => el.tags).flat()
      setTags(rawTags.filter((el: string, i: number) => rawTags.indexOf(el) === i))
    })
  }, [])

  return (<>
    <h2 className='head-text'>
      My creative{' '}
      <span>Portfolio</span>
    </h2>
    <div className='app__work-filter'>
      {tags.map((tag, i) => (
        <div key={i}
          onClick={() => handleWorkFilter(tag)}
          className={`app__work-filter-item app__flex p-text ${activeFilter === tag ? 'item-active' : ''}`} >
          {tag}
        </div>
      ))}
    </div>
    <motion.div
      animate={animateCard}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className='app__work-portfolio'
    >
      {filterWorks.map((work, i) => (
        <div key={i}
          className='app__work-item app__flex'
        >
          <div className='app__work-img app-flex'>
            <Image alt={work.title} src={urlFor(work.imgUrl).url()} width={150} height={200} />
            <motion.div
              // initial={{ opacity: 0 }}
              whileHover={{ opacity: [0, 1] }}
              transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
              className='app__work-hover app__flex'
            >
              {work.projectLink &&
                <Link href={work.projectLink} target='_blank' rel='noreferrer'>
                  <motion.div
                    // initial={{ scale: 0 }}
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className='app__flex'
                  >
                    <AiFillEye />
                  </motion.div>
                </Link>
              }

              <Link href={work.codeLink} target='_blank' rel='noreferrer'>
                <motion.div
                  // initial={{ scale: 0 }}
                  whileInView={{ scale: [0, 1] }}
                  whileHover={{ scale: [1, 0.9] }}
                  transition={{ duration: 0.25 }}
                  className='app__flex'
                >
                  <AiFillGithub />
                </motion.div>
              </Link>
            </motion.div>
          </div>
          <div className='app__work-content app__flex'>
            <h4 className='bold-text'>{work.title}</h4>
            <p className='p-text' style={{ marginTop: 10 }}>{work.description}</p>
            <div className='app__work-tag app__flex'>
              {work.tags.map((tag, i) => (
                tag != 'All' && <p key={i} className='p-text' style={{ marginRight: 5 }}>{tag}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  </>
  )
}

export default AppWrap({ children: <Work />, idName: 'work', classBG: 'app__primarybg', classSection: 'app__works' })