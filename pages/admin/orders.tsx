import { GetServerSideProps } from 'next'
import AdminContainer from '../../components/admin/AdminContainer'
import { getUserAdmin } from '../../lib/admin'

const Orders = ({ user }) => {
  return <AdminContainer user={user}>Orders</AdminContainer>
}

export default Orders

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [user, error] = await getUserAdmin(ctx)
  if (error) return error
  return {
    props: {
      user,
    },
  }
}
