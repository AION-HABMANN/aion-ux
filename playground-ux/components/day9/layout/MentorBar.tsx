'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ROUTES } from '@/data/day9/routes';
import { KEY } from '@/data/day9/support';
import { jumpTo } from '@/components/day9/day/jump';
import { useMentorStore } from '@/lib/day9/mentor-store';
import { useTasksStore } from '@/lib/day9/tasks-store';
import { useStore } from '@/lib/day9/store';

/**
 * The mentor bar (CLAUDE.md #7): one quiet line above the navigation. With the passcode a reviewer
 * can fill every model answer in one go and check both routes end to end. A convenience gate, not security.
 */
export function MentorBar() {
  const unlocked = useMentorStore((s) => s.unlocked);
  const unlock = useMentorStore((s) => s.unlock);
  const lock = useMentorStore((s) => s.lock);
  const fillAll = useTasksStore((s) => s.fillAll);
  const clearTasks = useTasksStore((s) => s.clearTasks);
  const name = useStore((s) => s.learner.name);
  const setName = useStore((s) => s.setName);
  const pathname = usePathname();
  const route = ROUTES.find((r) => pathname.startsWith(`/day/9/${r.slug}`));

  const [asking, setAsking] = useState(false);
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');

  const btn = 'rounded border border-hairline px-2 py-0.5 text-12 hover:bg-black/[0.05]';
  const submit = () => {
    if (unlock(code)) {
      setAsking(false);
      setMsg('');
    } else setMsg('Wrong passcode.');
    setCode('');
  };

  return (
    <div className="no-print border-b border-hairline bg-paper text-12">
      <div className="mx-auto flex min-h-[28px] max-w-7xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-1">
        <span className="font-mono uppercase tracking-wider text-ink-soft">Mentor</span>
        {!unlocked && !asking ? (
          <button type="button" className="underline underline-offset-2" onClick={() => setAsking(true)}>
            Enter passcode to fill all model answers
          </button>
        ) : null}
        {!unlocked && asking ? (
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <label htmlFor="mentor-code" className="sr-only">
              Mentor passcode
            </label>
            <input id="mentor-code" type="password" value={code} onChange={(e) => setCode(e.target.value)} autoFocus autoComplete="off" className="w-36 rounded border border-hairline bg-raised px-2 py-0.5 text-12" />
            <button type="submit" className={btn}>
              Go
            </button>
            <button
              type="button"
              className={btn}
              onClick={() => {
                setAsking(false);
                setMsg('');
              }}
            >
              Cancel
            </button>
          </form>
        ) : null}
        {unlocked ? (
          <>
            <button
              type="button"
              className={btn}
              onClick={() => {
                fillAll(KEY);
                if (!name) setName('Demo participant');
                setMsg('Model answers filled.');
              }}
            >
              Fill all model answers
            </button>
            {route ? (
              <>
                <button type="button" className={btn} onClick={() => jumpTo(`export-${route.no}`, { block: 'start', focus: false })}>
                  Jump to this route&rsquo;s export
                </button>
                <button
                  type="button"
                  className={btn}
                  onClick={() => {
                    clearTasks(route.taskIds);
                    setMsg(`Route ${route.no} cleared.`);
                  }}
                >
                  Clear this route
                </button>
              </>
            ) : null}
            <button type="button" className={btn} onClick={lock}>
              Lock
            </button>
          </>
        ) : null}
        <span role="status" aria-live="polite" className="text-ink-soft">
          {msg}
        </span>
      </div>
    </div>
  );
}
