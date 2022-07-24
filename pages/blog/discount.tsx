import Container from '../../components/Container'
import Wrapper from '../../components/Wrapper'

const RauskyPayments = () => {
  return (
    <Container>
      <Wrapper className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-3">Discount Up To 50 %</h1>
        <div className="text-gray-600 dark:text-gray-400 space-y-5">
          <p>Use code : WPURAUSKY to get 50 % discount for all payments</p>
        </div>
      </Wrapper>
    </Container>
  )
}

export default RauskyPayments
