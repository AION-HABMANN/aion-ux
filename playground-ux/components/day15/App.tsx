import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/day15/components/Layout'
import { Landing } from '@/components/day15/pages/Landing'
import { LearnHub } from '@/components/day15/pages/LearnHub'
import { PlayHub } from '@/components/day15/pages/PlayHub'
import { Foundations } from '@/components/day15/pages/learn/Foundations'
import { Limits } from '@/components/day15/pages/learn/Limits'
import { Neuro } from '@/components/day15/pages/learn/Neuro'
import { Ethics } from '@/components/day15/pages/learn/Ethics'
import { Leadership } from '@/components/day15/pages/learn/Leadership'
import { FocusSense } from '@/components/day15/pages/play/FocusSense'
import { LearningPulse } from '@/components/day15/pages/play/LearningPulse'
import { VisionMind } from '@/components/day15/pages/play/VisionMind'
import { Debrief } from '@/components/day15/pages/Debrief'

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
