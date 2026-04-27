import { AsyncLocalStorage } from 'async_hooks'

type Store = Record<string, unknown>

export const asyncLocalStorage = new AsyncLocalStorage<Store>()

function get<T = unknown>(key: string): T | undefined {
  return asyncLocalStorage.getStore()?.[key] as T | undefined
}

function set<T = unknown>(key: string, value: T): void {
  const store = asyncLocalStorage.getStore() ?? {}
  store[key] = value
  asyncLocalStorage.enterWith(store)
}

export default { get, set }
