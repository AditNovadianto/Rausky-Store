import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import { useState } from 'react'
import { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import Container from '../components/Container'
import Link from '../components/Link'
import Wrapper from '../components/Wrapper'
import { parseData } from '../lib/utils'
import { getAllCategories } from './api/categories'
import request from '../lib/request'
import Rating from '../components/Rating'
import RatingsModal from '../components/home/RatingsModal'

const getRatingCount = (ratings, star) => {
  return ratings.filter((rating) => rating.star == star).length
}

const Home = ({ categories }) => {
  const topupCategories = categories.filter((category) => category.isTopup)
  const otherCategories = categories.filter((category) => !category.isTopup)
  const [ratings, setRatings] = useState(null)
  const [showAllRatings, setShowAllRatings] = useState(false)

  console.log({ ratings })

  useEffect(() => {
    const fetchAppRatings = async () => {
      const { data } = await request.get('/ratings')
      setRatings(data)
    }
    fetchAppRatings()
  }, [])

  return (
    <Container>
      <Wrapper className="flex flex-col lg:flex-row min-h-screen space-y-8 lg:space-y-0">
        {/* TODO: biar keren kasih parallax effect */}

        {/* TOP UP */}
        <section className="lg:sticky lg:self-start lg:top-[80px] lg:flex-[1]">
          <h2 className="text-2xl font-bold mb-4">Top Up</h2>
          <div className="flex flex-col space-y-4">
            {topupCategories.map((category) => (
              <Link
                className="flex items-center group border dark:bg-gray-800 dark:border-gray-700 p-3 rounded-xl hover:border-green-400 dark:hover:border-green-400"
                key={category.id}
                href={`/topup/${category.slug}`}
              >
                <img
                  className="w-8 h-8 rounded-lg object-cover"
                  src={category.logoImg}
                  alt={category.slug}
                />
                <span className="font-medium ml-2 truncate">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="lg:mt-0 space-y-8 lg:flex-[3] lg:px-20">
          {/* DISCOUNTS */}
          <section className="space-y-4">
            <Link
              className="relative block overflow-hidden rounded-2xl"
              href="/blog/discount"
            >
              <img
                src="https://images.unsplash.com/photo-1639656333400-ee5240f757a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt="discount"
                className="w-full h-[200px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black to-transparent">
                <div>
                  <h3 className="font-medium text-xl text-white">
                    GET UP TO 50 %
                  </h3>
                  <button className="bg-green-500 text-white font-semibold px-4 py-1 rounded-lg text-sm mt-2">
                    Learn More
                  </button>
                </div>
              </div>
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
        </div>

        <div className="lg:sticky lg:self-start lg:top-[80px] space-y-8 lg:flex-[1]">
          {/* RATINGS */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              Ratings{' '}
              {ratings ? (
                <span className="text-gray-500 dark:text-gray-400 font-normal text-lg ml-2">
                  ({ratings.count.toLocaleString()})
                </span>
              ) : (
                <Skeleton width={30} className="ml-2" />
              )}
            </h2>
            {/* AVG RATING */}
            <div className="flex items-center">
              <StarIconSolid className="w-10 h-10 text-yellow-500 -ml-2" />
              {ratings ? (
                <span className="ml-2 font-semibold text-xl">
                  {ratings.avg}
                </span>
              ) : (
                <Skeleton width={30} height={25} className="ml-2" />
              )}
            </div>
            {/* RATING STATISTICS */}
            {ratings ? (
              <div className="mt-4 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const ratingCount = getRatingCount(ratings.ratings, star)
                  const ratingCountPercent =
                    (ratingCount / ratings.ratings.length) * 100
                  return (
                    <div key={star} className="flex items-center">
                      <span className="text-xs mr-5 font-medium">{star}</span>
                      <div
                        role="progress"
                        title={ratingCount.toLocaleString()}
                        className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
                      >
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{
                            width: ratingCountPercent + '%',
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="mt-4">
                <Skeleton count={5} height={8} borderRadius={50} />
              </div>
            )}
            {/* RATING LIST */}
            <div className="mt-4 space-y-3">
              {ratings ? (
                ratings.ratings
                  .slice(0, 2)
                  .map((rating) => <Rating key={rating.id} rating={rating} />)
              ) : (
                <Skeleton count={2} height={60} borderRadius={12} />
              )}
            </div>
            {ratings && (
              <>
                <button
                  onClick={() => setShowAllRatings(true)}
                  className="mt-3 text-green-500 font-medium hover:underline"
                >
                  show more &rarr;
                </button>
              </>
            )}
          </section>
        </div>

        {ratings && (
          <RatingsModal
            open={showAllRatings}
            onClose={() => setShowAllRatings(false)}
            ratings={ratings}
          />
        )}
      </Wrapper>
    </Container>
  )
}

export default Home

export const getStaticProps = async () => {
  const categories = await getAllCategories({
    select: 'isTopup,id,slug,name,bannerImg,logoImg',
    hasProducts: true,
  })
  return {
    props: parseData({
      categories,
    }),
    revalidate: 10,
  }
}
