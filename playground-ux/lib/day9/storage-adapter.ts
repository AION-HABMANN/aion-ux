/**
 * BUILD_PROMPT §12 — storage seam.
 * The app persists to localStorage today. If multi-device sync is ever needed,
 * implement this interface (e.g. against Supabase) and pass it to the store's
 * `createJSONStorage` factory. No component changes are required.
 */
export interface SessionStorageAdapter {
  getItem(name: string): string | null | Promise<string | null>;
  setItem(name: string, value: string): void | Promise<void>;
  removeItem(name: string): void | Promise<void>;
}

export const localStorageAdapter: SessionStorageAdapter = {
  getItem: (name) => (typeof window === 'undefined' ? null : window.localStorage.getItem(name)),
  setItem: (name, value) => {
    if (typeof window !== 'undefined') window.localStorage.setItem(name, value);
  },
  removeItem: (name) => {
    if (typeof window !== 'undefined') window.localStorage.removeItem(name);
  },
};
