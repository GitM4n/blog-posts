const memory = new Map<string, number>()

export function useScrollMemory(key: string) {
  function save() {
    memory.set(key, window.scrollY)
  }

  function restore() {
    const y = memory.get(key) ?? 0
    requestAnimationFrame(() => {
      window.scrollTo({ top: y, behavior: 'instant' })
    })
  }

  return { save, restore }
}
