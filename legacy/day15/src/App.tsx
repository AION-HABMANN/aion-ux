import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Landing } from '@/pages/Landing'
import { LearnHub } from '@/pages/LearnHub'
import { PlayHub } from '@/pages/PlayHub'
import { Foundations } from '@/pages/learn/Foundations'
import { Limits } from '@/pages/learn/Limits'
import { Neuro } from '@/pages/learn/Neuro'
import { Ethics } from '@/pages/learn/Ethics'
import { Leadership } from '@/pages/learn/Leadership'
import { FocusSense } from '@/pages/play/FocusSense'
import { LearningPulse } from '@/pages/play/LearningPulse'
import { VisionMind } from '@/pages/play/VisionMind'
import { Debrief } from '@/pages/Debrief'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/learn" element={<LearnHub />} />
        <Route path="/learn/foundations" element={<Foundations />} />
        <Route path="/learn/limits" element={<Limits />} />
        <Route path="/learn/neuro" element={<Neuro />} />
        <Route path="/learn/ethics" element={<Ethics />} />
        <Route path="/learn/leadership" element={<Leadership />} />
        <Route path="/play" element={<PlayHub />} />
        <Route path="/play/focussense" element={<FocusSense />} />
        <Route path="/play/learningpulse" element={<LearningPulse />} />
        <Route path="/play/visionmind" element={<VisionMind />} />
        <Route path="/debrief" element={<Debrief />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
