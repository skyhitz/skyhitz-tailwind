import { A, H1, P } from 'app/design/typography'
import { View } from 'react-native'
import Svg, {
  Path,
  ClipPath,
  Defs,
  Rect,
  ForeignObject,
} from 'react-native-svg'
import { useUserAtomState } from 'app/state/user'
import { SolitoImage } from 'app/design/solito-image'
import { HeroProps } from 'app/types'
import { TextLink } from 'solito/link'
import { FormInputWithIcon } from './inputs/FormInputWithIcon'
import LinkIcon from './icons/link'
import MailIcon from './icons/mail-outline'
import { useSubmitLinkMutation } from 'app/api/graphql'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { Button } from 'app/design/button'
import { useState } from 'react'

const validationSchema = Yup.object().shape({
  link: Yup.string().url('Invalid URL').required('Link is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
})

type FormData = {
  link: string
  email: string
}

export const Hero = ({ title, desc }: HeroProps) => {
  const { user } = useUserAtomState()
  const [submitted, setSubmitted] = useState(false)

  const [submitLink, { loading, error }] = useSubmitLinkMutation()

  const handleSubmit = async (
    formData: FormData,
    { resetForm }: { resetForm: () => void },
  ) => {
    if (loading) return
    const res = await submitLink({
      variables: {
        link: formData.link,
        email: formData.email,
      },
    })
    if (res.data?.submitLink.success) {
      setSubmitted(true)
      resetForm()
    }
  }

  const initialValues: FormData = {
    link: '',
    email: '',
  }
  return (
    <View className="mx-auto max-w-7xl px-6 pt-8 md:flex-row md:pb-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
      <View className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
        <H1 className="mt-10 max-w-lg text-4xl font-bold !leading-tight tracking-tight sm:text-5xl">
          {title}
        </H1>
        <P className="mt-6 leading-8 text-gray-600">{desc}</P>

        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            isValid,
            handleSubmit,
          }: FormikProps<FormData>) => (
            <View className="flex">
              <View className="mt-10 flex flex-col items-center gap-x-6 md:flex-row">
                <View className="flex w-full flex-grow md:w-auto">
                  <FormInputWithIcon
                    value={values.link}
                    containerClassNames="border border-white rounded md:mr-2 !py-2"
                    icon={() => (
                      <LinkIcon
                        size={22}
                        className="absolute right-2 border-4 border-white bg-white"
                      />
                    )}
                    onChangeText={handleChange('link')}
                    onBlur={handleBlur('link')}
                    className="text-md border-grey-light flex-grow rounded-md border-[0.5px] px-4 py-2 font-bold text-gray-600 focus:border-gray-600 focus-visible:outline-gray-600 md:ml-2"
                    placeholder="Music NFT link"
                    iconPosition="right"
                    keyboardType="url"
                    onSubmitEditing={() => handleSubmit()}
                    editable={!loading}
                  />
                  <FormInputWithIcon
                    value={values.email}
                    containerClassNames="border border-white rounded md:mr-2 !py-2"
                    icon={() => (
                      <MailIcon
                        size={22}
                        className="absolute right-2 border-4 border-white bg-white"
                      />
                    )}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    className="text-md border-grey-light flex-grow rounded-md border-[0.5px] px-4 py-2 font-bold text-gray-600 focus:border-gray-600 focus-visible:outline-gray-600 md:ml-2"
                    placeholder="Email"
                    iconPosition="right"
                    onSubmitEditing={() => handleSubmit()}
                    editable={!loading}
                  />
                </View>

                <Button
                  onPress={handleSubmit}
                  loading={loading}
                  text={submitted ? 'Done!' : 'Submit'}
                  size="default"
                  className="w-full md:mr-2 md:w-40"
                  disabled={!isValid}
                />
              </View>
              <View className="mt-4 flex-row">
                <P className="text-red min-h-5 w-full px-2 text-left text-sm">
                  {(touched.link && errors.link) ||
                    (touched.email && errors.email) ||
                    error?.message}
                </P>
              </View>
            </View>
          )}
        </Formik>
      </View>
      <View className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
        <Svg
          viewBox="0 0 366 729"
          role="img"
          className="mx-auto hidden w-[22.875rem] max-w-full drop-shadow-xl md:flex"
        >
          <Defs>
            <ClipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
              <Rect width={316} height={684} rx={36} />
            </ClipPath>
          </Defs>
          <Path
            fill="#4B5563"
            d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
          />
          <Path
            fill="#FFFFFF"
            d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
          />
          <ForeignObject
            width={316}
            height={684}
            transform="translate(24 24)"
            clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
          >
            <SolitoImage
              src="/img/app.webp"
              alt="Skyhitz app"
              contentFit="cover"
              width={366}
              height={729}
              // @ts-ignore
              className="mx-auto flex h-full w-[22.875rem] max-w-full rounded-b-[3.7rem]"
              priority
            />
          </ForeignObject>
        </Svg>
      </View>
    </View>
  )
}
