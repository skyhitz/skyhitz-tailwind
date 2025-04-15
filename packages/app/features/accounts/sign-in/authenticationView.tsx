import { SignInParam } from 'app/hooks/param/useSignInParam'
import { useEffect } from 'react'
import { useLogIn } from 'app/hooks/useLogIn'
import { User, useSignInWithTokenMutation } from 'app/api/graphql'
import { useRouter } from 'solito/navigation'
import { P, ActivityIndicator } from 'app/design/typography'
import { Button } from 'app/design/button'
import { View } from 'react-native'
import { useToast } from 'app/provider/toast'

export function AuthenticationView({
  signInParam,
}: {
  signInParam: SignInParam
}) {
  const [signIn, { error }] = useSignInWithTokenMutation()
  const { push } = useRouter()
  const logIn = useLogIn()
  const toast = useToast()

  useEffect(() => {
    const trySignIn = async () => {
      try {
        const { data } = await signIn({
          variables: {
            uid: signInParam.uid,
            token: signInParam.token,
          },
        })
        if (data?.signInWithToken) {
          logIn(data.signInWithToken as User)

          // Show toast for claimed earnings if successful
          if (
            data.signInWithToken.claimEarnings?.success &&
            data.signInWithToken.claimEarnings.totalClaimedAmount > 0
          ) {
            toast.show(
              `Successfully claimed ${data.signInWithToken.claimEarnings.totalClaimedAmount} XLM!`,
              { type: 'success' },
            )
          }
        }
      } catch (ex) {
        //no-op
      }
    }
    trySignIn()
  }, [signInParam, signIn, logIn, toast])

  return (
    <View className="flex w-72 items-center">
      {error ? (
        <>
          <P className="w-full text-center text-[#d9544f]">{error.message}</P>
          <Button
            text="Go back"
            onPress={() => push('/')}
            className="my-3"
            variant="secondary"
          />
        </>
      ) : (
        <>
          <ActivityIndicator size="large" />
          <P className="mt-2 text-center text-white">Authentication</P>
        </>
      )}
    </View>
  )
}
