import { createParam } from 'solito'

export type CollectorParam = {
  id: string
}

const { useParam } = createParam<CollectorParam>()
export const useCollectorParam = (): string | undefined => {
  const [id] = useParam('id')
  return id
}
