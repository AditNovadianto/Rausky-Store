import Container from '../components/Container'
import Wrapper from '../components/Wrapper'
import request from '../lib/request'

const Home = () => {
  return (
    <Container>
      <Wrapper>
        <p>Umang ni bos</p>
        <button
          onClick={async () => {
            const { data } = await request.post('/products')
            console.log(data)
          }}
        >
          create product
        </button>
      </Wrapper>
    </Container>
  )
}

export default Home
