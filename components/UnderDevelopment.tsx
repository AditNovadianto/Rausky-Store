import { useRouter } from 'next/router'
import Container from './Container'
import Wrapper from './Wrapper'

const UnderDevelopment = () => {
  const router = useRouter()
  return (
    <Container title={router.asPath}>
      <Wrapper>
        <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 space-x-8 mt-20">
          <img
            src="/images/illustration/under-development.svg"
            alt="under development"
            className="w-[500px]"
          />
          <div className="mt-10">
            <p className="mb-2 text-green-500 italic">{router.asPath}</p>
            <h3 className="font-bold text-4xl">
              This page is under development 🚧
            </h3>
            <p className="mt-4 text-gray-500 max-w-[40ch] text-xl">
              Sorry for the inconvenience. We will provide the best experience
              for you ✨
            </p>
            <button
              onClick={router.back}
              className="bg-green-500 text-white px-4 py-1 mt-4 rounded-lg font-semibold hover:bg-green-600"
            >
              &larr; Back
            </button>
          </div>
        </div>
      </Wrapper>
    </Container>
  )
}

export default UnderDevelopment
