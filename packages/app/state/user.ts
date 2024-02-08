import { atom } from 'recoil'
import { User } from 'app/api/graphql'
import { SecureStorage } from 'app/utils/secure-storage'

const localForageEffect =
  (key: string) =>
  ({ setSelf, onSet, trigger }: { setSelf: any; onSet: any; trigger: any }) => {
    // If there's a persisted value - set it on load
    const loadPersisted = async () => {
      const savedValue = await SecureStorage.get(key)

      if (savedValue != null) {
        setSelf(JSON.parse(savedValue))
      }
    }

    // Asynchronously set the persisted data
    if (trigger === 'get') {
      loadPersisted()
    }

    // Subscribe to state changes and persist them to localForage
    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? SecureStorage.clear(key)
        : SecureStorage.save(key, JSON.stringify(newValue))
    })
  }

const getDefaultUser = async () => {
  const defaultUser = await SecureStorage.get('current_user')
  if (defaultUser) {
    return JSON.parse(defaultUser) as User
  }
  return null
}

export const userAtom = atom<User | null>({
  key: 'user',
  default: getDefaultUser(),
  effects: [localForageEffect('current_user')],
})

export const appInitializedAtom = atom<boolean>({
  key: 'initialized',
  default: false,
})
