import Container from '../../components/Container'
import Wrapper from '../../components/Wrapper'
import { parseData } from '../../lib/utils'
import { getSpecificCategory } from '../api/categories/[categoryId]'
import cn from 'classnames'
import { useStateMachine } from 'little-state-machine'
import TopupInfo from '../../components/topup/TopupInfo'
import TopupItems from '../../components/topup/TopupItems'

const Topup = ({ category }) => {
  const { state } = useStateMachine()
  const { cart } = state
  const totalItemsInCart = cart.length

  return (
    <Container noTopMargin title={category.name}>
      <br className="hidden md:block" />
      {/* BANNER IMG */}
      <img
        className="w-full md:hidden"
        src={category.bannerImg}
        alt={category.slug}
      />
      <Wrapper className={cn('md:flex', totalItemsInCart > 0 && 'pb-20')}>
        <TopupInfo category={category} />
        <TopupItems category={category} />
      </Wrapper>
    </Container>
  )
}

export default Topup

export const getServerSideProps = async ({ params }) => {
  const category = await getSpecificCategory({ categorySlug: params.category })

  if (!category) {
    return {
      notFound: true,
    }
  }

  return {
    props: parseData({ category }),
  }
}
