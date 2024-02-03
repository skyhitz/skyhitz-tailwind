import { ReactNode, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { userAtom } from 'app/state/user'
import { useRouter } from 'solito/router'
import { SplashScreen } from 'app/features/splash/splashScreen'
import { A } from 'app/design/typography'
import { ClientOnly } from 'app/ui/client-only'

type Props = {
  children: ReactNode
  redirect?: boolean
  fallback?: () => ReactNode
  linkToAuth?: boolean
}

export function AuthWrap({
  children,
  redirect = true,
  fallback = SplashScreen,
  linkToAuth = false,
}: Props) {
  const user = useRecoilValue(userAtom)
  const { push } = useRouter()

  useEffect(() => {
    if (!user && redirect) {
      push('/')
    }
  }, [user, push, redirect])

  // if auth with a valid user show protected stuff
  if (user) {
    return <>{children}</>
  }

  if (linkToAuth) {
    return (
      <A className="flex text-gray-600" href={'/sign-in'}>
        {children}
      </A>
    )
  }

  /* otherwise return fallback, will do a redirect from useEffect */
  return <>{fallback()}</>
}

export function ComponentAuthGuard({
  children,
  ...rest
}: {
  children: ReactNode
  linkToAuth?: boolean
}) {
  return (
    <ClientOnly>
      <AuthWrap fallback={() => null} redirect={false} {...rest}>
        {children}
      </AuthWrap>
    </ClientOnly>
  )
}

export function AuthGuard({ children, ...props }) {
  return (
    <ClientOnly>
      <AuthWrap {...props}>{children}</AuthWrap>
    </ClientOnly>
  )
}
