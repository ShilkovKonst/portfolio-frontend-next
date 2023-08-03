'use client'
import React, { useEffect, useState } from 'react'
import { AppWrap } from '@/wrapper'
import { motion } from 'framer-motion'
import { client, urlFor } from '@/client'
import Image from 'next/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import './Skills.scss'

interface skill {
  name: string,
  bgColor: string,
  icon: SanityImageSource
}

interface experience {
  year: string,
  works: workExp[]
}

interface workExp {
  name: string,
  company: string,
  desc: string
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<skill[]>([])
  const [exps, setExps] = useState<experience[]>([])

  useEffect(() => {
    const querySkills = '*[_type == "skills"]'
    const queryExps = '*[_type == "experiences"]'
    client.fetch(querySkills).then((data) => setSkills(data))
    client.fetch(queryExps).then((data) => setExps(data))
  }, [])

  return (
    <>
      <h2 className='head-text'>Skills &{' '}
        <span>Experience</span>
      </h2>
      <div className='app__skills-container'>
        <div className='app__skills-list'>
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='app__skills-item app__flex'
            >
              <div className='app__flex' style={{ backgroundColor: skill.bgColor }}>
                <Image src={urlFor(skill.icon).url()} alt={skill.name} width={75} height={75} />
              </div>
              <p className='p-text'>{skill.name}</p>
            </motion.div>
          ))}
        </div>
        <div className='app__skills-exp'>
          {exps.map((exp, i) => (
            <div className='app__skills-exp-item' key={i}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{exp.year}</p>
                {exp?.works?.map((work, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='app__skills-exp-work'
                  >
                    <h4 className='bold-text'>{work.name}</h4>
                    <p className='p-text'>{work.company}</p>
                  </motion.div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AppWrap({ children: <Skills />, idName: 'skills', classBG: 'app__whitebg', classSection: 'app__skills' })