import Container from '../components/Container'
import Link from '../components/Link'
import Wrapper from '../components/Wrapper'
import request from '../lib/request'

const otherCategories = [
  {
    label: 'Gaming Gear',
    img: 'https://images.unsplash.com/photo-1604846887565-640d2f52d564?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
    slug: 'gaming-gear',
  },
  {
    label: 'Merchandise',
    img: 'https://images.unsplash.com/photo-1603319444400-216c0718d03c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    slug: 'merchandise',
  },
]

const Home = ({ categories }) => {
  return (
    <Container>
      <Wrapper className="space-y-8">
        {/* TOP UP */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Top Up</h2>
          <div className="flex flex-col space-y-2">
            {/* TODO: kasih logo tiap topup */}
            {categories.map((category) => (
              <Link
                key={category.slug}
                className="font-medium"
                href={`/topup/${category.slug}`}
              >
                👉 {category.label} &rarr;
              </Link>
            ))}
          </div>
        </section>

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
                <img src={category.img} alt={category.slug} />
                <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black via-transparent">
                  <span className="font-medium text-xl text-white">
                    {category.label} &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Wrapper>
    </Container>
  )
}

export default Home

export const getStaticProps = async () => {
  const { data } = await request.get('/products/topupCategories')
  const { categories } = data
  return {
    props: JSON.parse(
      JSON.stringify({
        categories,
      })
    ),
    revalidate: 10,
  }
}
