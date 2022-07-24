import Container from '../../components/Container'
import Wrapper from '../../components/Wrapper'

// TODO: jelasin kenapa transaksinya belom beneran
const RauskyPayments = () => {
  return (
    <Container>
      <Wrapper className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-3">Temporary Rausky payments</h1>
        <div className="text-gray-600 dark:text-gray-400 space-y-5">
          <p>
            Web Aplication Rausky Gamestore masih dalam tahap pengembangan.
            Untuk itu semua pembayaran masih dalam bentuk ilustrasi sehingga
            tidak dikenakan biaya apapun.
          </p>
          <p>
            The Rausky Gamestore web application is still under development. For
            this reason, all payments are still in the form of illustrations so
            that there is no charge whatsoever.
          </p>
        </div>
      </Wrapper>
    </Container>
  )
}

export default RauskyPayments
