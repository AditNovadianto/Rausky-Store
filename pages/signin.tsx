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
  google:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png',
  discord:
    'https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png',
  github: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
}

const SignIn = ({ providers }: Props) => {
  console.log(providers)
  return (
    <Container title="SignIn" noNavbar>
      <Wrapper className="mt-20 text-center flex flex-col items-center">
        <Link href="/">
          <img src="/images/rausky-logo.png" alt="" />
        </Link>
        <h3 className="font-bold text-3xl">Sign In dulu bos</h3>
        <div className="mt-10 space-y-5">
          {Object.values(providers).map((provider) => {
            return (
              <button
                key={provider.name}
                className="w-full flex items-center font-medium p-4 border rounded-md transition-all hover:scale-105 active:scale-95"
                onClick={() => signIn(provider.id)}
              >
                <img
                  className="w-4 h-4 mr-5"
                  src={providerLogo[provider.id]}
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
