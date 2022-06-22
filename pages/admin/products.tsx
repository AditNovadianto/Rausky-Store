import { GetServerSideProps } from 'next'
import AdminContainer from '../../components/admin/AdminContainer'
import { getUserAdmin } from '../../lib/admin'

const Products = ({ user }) => {
  return <AdminContainer user={user}>Products</AdminContainer>
}

export default Products

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [user, error] = await getUserAdmin(ctx)
  if (error) return error
  return {
    props: {
      user,
    },
  }
}
