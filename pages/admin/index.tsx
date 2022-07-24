import { GetServerSideProps } from 'next'
import AdminContainer from '../../components/admin/AdminContainer'
import { getUserAdmin } from '../../lib/admin'
import { User } from '../../types/next-auth'

interface Props {
  user: User
}

const Admin = ({ user }: Props) => {
  return <AdminContainer user={user}>admin content</AdminContainer>
}

export default Admin

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [user, error] = await getUserAdmin(ctx)
  if (error) return error
  return {
    props: {
      user,
    },
  }
}
