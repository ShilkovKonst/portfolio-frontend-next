'use client'
import './About.scss'
import React, { ReactNode, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { client, urlFor } from '@/client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { AppWrap } from '@/wrapper'
import Link from 'next/link'

interface Skill {
  name: string,
  bgColor: string,
  tag: string,
  icon: SanityImageSource
}

interface About {
  title: string,
  description: string[],
  imgUrl: SanityImageSource
}

interface Activity {
  title: string,
  link: string,
  imgUrl: SanityImageSource
}

const About: React.FC = () => {
  const [goodSkills, setGoodSkills] = useState<Skill[]>([])
  const [normalSkills, setNormalSkills] = useState<Skill[]>([])
  const [otherSkills, setOtherSkills] = useState<Skill[]>([])
  const [abouts, setAbouts] = useState<About[]>([])
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const queryAbouts = `*[_type == "abouts"]`
    const querySkills = '*[_type == "skills"]'
    const queryActivities = '*[_type == "activities"]'
    client.fetch(queryAbouts).then((data) => setAbouts(data.reverse()))
    client.fetch(queryActivities).then((data) => setActivities(data.reverse()))
    client.fetch(querySkills).then((data) => setGoodSkills(data.filter((el: Skill) => el.tag === '+++++')))
    client.fetch(querySkills).then((data) => setNormalSkills(data.filter((el: Skill) => el.tag === '+++')))
    client.fetch(querySkills).then((data) => setOtherSkills(data.filter((el: Skill) => el.tag === '+')))
  }, [])

  return (
    <>
      <h2 className='head-text'>
        Mes <span>Compétences</span> & <span>Activités</span>
      </h2>
      <div className='app__abouts-container'>
        <div className='app__abouts-skills'>
          <div className='app__abouts-skills-sublist'>
            {goodSkills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='app__abouts-skills-item app__flex'
              >
                <div className='app__flex' style={{ backgroundColor: '#fed4d5' }}>
                  <Image src={urlFor(skill.icon).url()} alt={skill.name} width={75} height={75} />
                </div>
                <p className='p-text'>{skill.name}</p>
              </motion.div>
            ))}
          </div>
          <div className='app__abouts-skills-sublist'>
            {normalSkills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='app__abouts-skills-item app__flex'
              >
                <div className='app__flex' style={{ backgroundColor: '#fae4e5' }}>
                  <Image src={urlFor(skill.icon).url()} alt={skill.name} width={75} height={75} />
                </div>
                <p className='p-text'>{skill.name}</p>
              </motion.div>
            ))}
          </div>
          <div className='app__abouts-skills-sublist'>
            {otherSkills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='app__abouts-skills-item app__flex'
              >
                <div className='app__flex' style={{ backgroundColor: '#fef4f5' }}>
                  <Image src={urlFor(skill.icon).url()} alt={skill.name} width={75} height={75} />
                </div>
                <p className='p-text'>{skill.name}</p>
              </motion.div>
            ))}
          </div>
          <div className='app__abouts-skills-activities'>
            <h3 className='subhead-text'>
              Je deviens meilleur chaque jour
            </h3>
            <div className=''>
              {activities.map((activity, i) => (
                <Link
                  key={i}
                  href={activity.link} target='_blank'
                  className='app__abouts-activities-item app__flex'
                >
                  <div>
                    <Image src={urlFor(activity.imgUrl).url()} alt={activity.title} width={75} height={75} />
                  </div>
                  <p className='p-text'>{activity.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className='app__abouts-right'>
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
        </div>
      </div>
    </>
  )
}

export default AppWrap({ children: <About />, idName: 'about', classBG: 'app__whitebg', classSection: 'app__about' })