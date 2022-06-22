import { GetServerSideProps } from 'next'
import AdminContainer from '../../components/admin/AdminContainer'
import { getUserAdmin } from '../../lib/admin'

const Users = ({ user }) => {
  return <AdminContainer user={user}>Users</AdminContainer>
}

export default Users

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [user, error] = await getUserAdmin(ctx)
  if (error) return error
  return {
    props: {
      user,
    },
  }
}
