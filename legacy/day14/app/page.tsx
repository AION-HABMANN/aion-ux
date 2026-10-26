'use client';

import { BuildVisionTab } from '@/components/cases/BuildVision/BuildVisionTab';
import { HealthSpaceTab } from '@/components/cases/HealthSpace/HealthSpaceTab';
import { IndustryXrTab } from '@/components/cases/IndustryXR/IndustryXrTab';
import { LearnTab } from '@/components/learn/LearnTab';
import { Footer } from '@/components/shell/Footer';
import { Header } from '@/components/shell/Header';
import { TabBar } from '@/components/shell/TabBar';
import { TaskMapTable } from '@/components/taskmap/TaskMapTable';
import { TrainingTab } from '@/components/training/TrainingTab';
import { TransferTab } from '@/components/transfer/TransferTab';
import { TABS, type TabId } from '@/content/tabs';
import { STORAGE_KEYS, usePersistentState } from '@/lib/storage';

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
