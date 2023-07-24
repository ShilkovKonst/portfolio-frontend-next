import { client } from '@/client'
import { About, Header, Skills, Testimonial, Work } from '@/containers'
import { StaticImageData } from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
    </main>
  )
}
