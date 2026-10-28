'use client';

import { BuildVisionTab } from '@/original/components/day14/cases/BuildVision/BuildVisionTab';
import { HealthSpaceTab } from '@/original/components/day14/cases/HealthSpace/HealthSpaceTab';
import { IndustryXrTab } from '@/original/components/day14/cases/IndustryXR/IndustryXrTab';
import { LearnTab } from '@/original/components/day14/learn/LearnTab';
import { Footer } from '@/original/components/day14/shell/Footer';
import { Header } from '@/original/components/day14/shell/Header';
import { TabBar } from '@/original/components/day14/shell/TabBar';
import { TaskMapTable } from '@/original/components/day14/taskmap/TaskMapTable';
import { TrainingTab } from '@/original/components/day14/training/TrainingTab';
import { TransferTab } from '@/original/components/day14/transfer/TransferTab';
import { TABS, type TabId } from '@/original/data/day14/tabs';
import { STORAGE_KEYS, usePersistentState } from '@/original/lib/day14/storage';

export default function Page() {
  const [active, setActive] = usePersistentState<TabId>(STORAGE_KEYS.activeTab, 'learn');
  const current = TABS.some((tab) => tab.id === active) ? active : 'learn';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <TabBar active={current} onChange={setActive} />

      <main className="flex-1">
        <div
          className="mx-auto w-full max-w-shell px-3 py-5 sm:px-6 sm:py-8"
          id={`panel-${current}`}
          role="tabpanel"
          aria-labelledby={`tab-${current}`}
        >
          {current === 'learn' && <LearnTab />}
          {current === 'training' && <TrainingTab />}
          {current === 'buildvision' && <BuildVisionTab />}
          {current === 'healthspace' && <HealthSpaceTab />}
          {current === 'industryxr' && <IndustryXrTab />}
          {current === 'transfer' && <TransferTab />}
          {current === 'taskmap' && <TaskMapTable onNavigate={setActive} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
