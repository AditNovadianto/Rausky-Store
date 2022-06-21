import Container from '../components/Container'
import Wrapper from '../components/Wrapper'
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  signIn,
} from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'
import Link from '../components/Link'

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >
}

const providerLogo = {
  google: 'google.webp',
  discord: 'discord.png',
  github: 'github.png',
}

const SignIn = ({ providers }: Props) => {
  return (
    <Container title="Sign In" noNavbar>
      <Wrapper className="py-20 text-center flex flex-col items-center max-w-xs md:max-w-4xl">
        <Link href="/">
          <img src="/images/rausky-logo.png" alt="" />
        </Link>
        <h3 className="font-bold text-3xl">Sign In to Rausky Gamestore</h3>
        <div className="w-full mt-10 space-y-5 flex flex-col md:flex-row md:space-y-0 md:space-x-5">
          {Object.values(providers).map((provider) => {
            return (
              <button
                key={provider.name}
                className="w-full flex md:flex-col items-center justify-center font-medium p-4 md:p-8 border rounded-md transition-all hover:scale-105 active:scale-95 text-lg md:text-xl"
                onClick={() => signIn(provider.id)}
              >
                <img
                  className="w-6 md:w-10 h-6 md:h-10 mr-8 md:mr-0 md:mb-5"
                  src={'/images/auth/' + providerLogo[provider.id]}
                  alt=""
                />
                Sign in with {provider.name}
              </button>
            )
          })}
        </div>
      </Wrapper>
    </Container>
  )
}

export default SignIn

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      providers: await getProviders(),
    },
  }
}
