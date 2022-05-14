import Container from '../components/Container'
import Wrapper from '../components/Wrapper'
import { signOut } from 'next-auth/react'

const Home = () => {
  return (
    <Container>
      <Wrapper>
        <p>Umang ni bos</p>
        <button onClick={() => signOut()}>signout</button>
      </Wrapper>
    </Container>
  )
}

export default Home
