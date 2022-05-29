import { useStateMachine } from 'little-state-machine'
import Container from '../components/Container'
import Wrapper from '../components/Wrapper'

// TODO: bikin halaman pay finish
// TODO: edit object orderbuat disimpen ke order history
const PayFinish = () => {
  const { state } = useStateMachine()
  const { payFinish } = state
  const { order, data } = payFinish
  console.log(payFinish)
  return (
    <Container>
      <Wrapper>
        <h2 className="font-semibold text-xl">
          Thanks for your orders{order.user?.name ? `, ${order.user.name}` : ''}
          ! ✅
        </h2>

        <div className="mt-2 text-sm">
          <p className="text-gray-500">Your order has been processed</p>
        </div>
      </Wrapper>
    </Container>
  )
}

export default PayFinish
