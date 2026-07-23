import { defineStore } from 'pinia'

export const useScrollStore = defineStore('scroll', {
  state: () => ({
    positions: {} as Record<string, number>
  }),
  actions: {
    savePosition(path: string) {
      this.positions[path] = window.scrollY
    },
    getPosition(path: string): number | null {
      return this.positions[path] ?? null
    },
    removePosition(path: string) {
      delete this.positions[path]
    }
  }
})

