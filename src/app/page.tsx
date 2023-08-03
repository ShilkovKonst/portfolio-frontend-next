import { About, Header, Skills, Work, Footer } from '@/containers'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <About />
      <Work />
      <Skills />
      <Footer />
    </main>
  )
}
