if (typeof window === 'undefined') {
  global.localStorage = {
    length: 0,
    clear: () => {},
    setItem: () => {},
    removeItem: () => {},
    getItem: (key: string) => {
      return null
    },
    key: (index: number) => {
      return null
    },
  }
}

export const SecureStorage = {
  save: async (key: string, value: string) => {
    await localStorage.setItem(key, value)
  },
  clear: async (key: string) => {
    await localStorage.removeItem(key)
  },
  get: async (key: string) => {
    return await localStorage.getItem(key)
  },
}
