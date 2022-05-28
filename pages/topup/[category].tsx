import Container from '../../components/Container'
import Wrapper from '../../components/Wrapper'
import { parseData } from '../../lib/utils'
import { getSpecificCategory } from '../api/categories/[categoryId]'
import TopupInfo from '../../components/topup/TopupInfo'
import TopupItems from '../../components/topup/TopupItems'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'

const Topup = ({ category, user }) => {
  console.log(category)

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
        <TopupItems category={category} user={user} />
      </Wrapper>
    </Container>
  )
}

export default Topup

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const session = await getSession({ req })
  const category = await getSpecificCategory({
    categorySlug: params.category as string,
  })

  if (!category) {
    return {
      notFound: true,
    }
  }

  return {
    props: parseData({ category, user: session?.user }),
  }
}
