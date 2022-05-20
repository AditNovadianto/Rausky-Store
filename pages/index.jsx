import Container from '../components/Container'
import Link from '../components/Link'
import Wrapper from '../components/Wrapper'
import request from '../lib/request'
import { parseData } from '../lib/utils'

const Home = ({ categories }) => {
  const topupCategories = categories.filter((category) => category.isTopup)
  const otherCategories = categories.filter((category) => !category.isTopup)

  return (
    <Container>
      <Wrapper className="flex flex-col lg:flex-row min-h-screen space-y-8 lg:space-y-0">
        {/* TODO: biar keren kasih parallax effect */}

        {/* TOP UP */}
        <section className="lg:sticky lg:self-start lg:top-[80px] lg:flex-[1]">
          <h2 className="text-2xl font-bold mb-4">Top Up</h2>
          <div className="flex flex-col space-y-2">
            {/* TODO: kasih logo tiap topup */}
            {topupCategories.map((category) => (
              <Link
                key={category.id}
                className="font-medium"
                href={`/topup/${category.slug}`}
              >
                👉 {category.name}
              </Link>
            ))}
          </div>
        </section>

        <div className="lg:mt-0 space-y-8 lg:flex-[3] lg:px-20">
          {/* DISCOUNTS */}
          <section className="space-y-4">
            <Link className="relative block bg-green-200 rounded-2xl" href="/">
              <img
                src="/images/pattern-discount-1.png"
                alt="discount"
                className="w-full"
              />
              <h3 className="font-bold text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                GET UP TO 50%
              </h3>
            </Link>
          </section>

          {/* OTHERS */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Yakali ga sekalian</h2>
            <div className="space-y-4">
              {otherCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="block relative rounded-2xl overflow-hidden"
                >
                  <img src={category.bannerImg} alt={category.slug} />
                  <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black via-transparent">
                    <span className="font-medium text-xl text-white">
                      {category.name} &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ALL PRODUCTS */}
          <section className="hidden lg:block">
            <h2 className="text-2xl font-bold mb-4">Biar ga kosong aja</h2>
            {/* TODO: tampilin all products */}
          </section>
        </div>

        <div className="lg:sticky lg:self-start lg:top-[80px] space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Sultan Rausky</h2>
            {/* TODO: tampilin sultan rausky */}
            <div>Tebo</div>
            <div>Umang</div>
            <div>Kuncoro</div>
          </section>

          {/* STATISTICS */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Statistik Penjualan</h2>
            {/* TODO: bikin statistik penjualan */}
            <p>coming soon 😎</p>
          </section>
        </div>

        {/* ALL PRODUCTS */}
        <section className="lg:hidden">
          <h2 className="text-2xl font-bold mb-4">Biar ga kosong aja</h2>
          {/* TODO: tampilin all products */}
        </section>
      </Wrapper>
    </Container>
  )
}

export default Home

export const getStaticProps = async () => {
  const { data } = await request.get(
    '/categories?select=name,id,slug,bannerImg,isTopup'
  )
  const { categories } = data
  return {
    props: parseData({
      categories,
    }),
    revalidate: 10,
  }
}
