import Navbar from './components/tlc-ai/Navbar.jsx'
import Hero from './components/tlc-ai/Hero.jsx'
import TrafficCrisis from './components/tlc-ai/TrafficCrisis.jsx'
import WhyAISearchMatters from './components/tlc-ai/WhyAISearchMatters.jsx'
import HowAnswerEnginesWork from './components/tlc-ai/HowAnswerEnginesWork.jsx'
import VisibilityTracking from './components/tlc-ai/VisibilityTracking.jsx'
import WinningLooksLike from './components/tlc-ai/WinningLooksLike.jsx'
import AnswerEngineChecklist from './components/tlc-ai/AnswerEngineChecklist.jsx'
import FinalCTA from './components/tlc-ai/FinalCTA.jsx'
import References from './components/tlc-ai/References.jsx'
import Footer from './components/tlc-ai/Footer.jsx'
import StickyCTA from './components/tlc-ai/StickyCTA.jsx'
import { bg } from './components/tlc-ai/shared.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ background: bg }}>
        <Hero />
        <TrafficCrisis />
        <WhyAISearchMatters />
        <HowAnswerEnginesWork />
        <VisibilityTracking />
        <WinningLooksLike />
        <AnswerEngineChecklist />
        <FinalCTA />
        <References />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
