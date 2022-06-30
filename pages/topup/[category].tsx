import Container from '../../components/Container'
import Wrapper from '../../components/Wrapper'
import { parseData } from '../../lib/utils'
import { getSpecificCategory } from '../api/categories/[categoryId]'
import TopupInfo from '../../components/topup/TopupInfo'
import TopupItems from '../../components/topup/TopupItems'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'

const Topup = ({ category }) => {
  const { data, status } = useSession()
  const user = data?.user

  return (
    <Container noTopMargin title={category.name}>
      <br className="hidden md:block" />
      {/* BANNER IMG */}
      <img
        className="w-full md:hidden"
        src={category.bannerImg}
        alt={category.slug}
      />
      <Wrapper className="md:flex">
        <TopupInfo category={category} />
        {status !== 'loading' && <TopupItems category={category} user={user} />}
      </Wrapper>
    </Container>
  )
}

export default Topup

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const category = await getSpecificCategory({
    categorySlug: params.category as string,
    includeProducts: true,
  })

  if (!category) {
    return {
      notFound: true,
    }
  }

  return {
    props: parseData({ category }),
  }
}
