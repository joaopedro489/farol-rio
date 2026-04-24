export interface Context {
  set<T>(key: string, value: T): void
  get<T>(key: string): T
}
