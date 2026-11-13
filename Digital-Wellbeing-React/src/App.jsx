
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'

import ScreenTime from './pages/ScreenTime'
import Habits from './pages/Habits'
import Sleep from './pages/Sleep'
import SocialMedia from './pages/SocialMedia'
import Focus from './pages/Focus'
import Header from './components/Header'
import Hero from './components/Hero'
import TopicsSections from './components/TopicsSections'
import Footer from './components/Footer'
import Coach from './pages/Coach'

function TopicPage({ title, description }) {
  return (
    <main className="wrap" style={{ paddingTop: '50px', paddingBottom: '60px' }}>
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <TopicsSections />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/screen-time" element={<ScreenTime />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/sleep" element={<Sleep />} />
        <Route path="/social-media" element={<SocialMedia />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/coach" element={<Coach />} />
      </Routes>

      <Footer />
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
