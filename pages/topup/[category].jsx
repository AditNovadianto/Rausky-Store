import { useState } from 'react'
import Container from '../../components/Container'
import Wrapper from '../../components/Wrapper'
import Link from '../../components/Link'
import MLSection from '../../components/topup/MLSection'
import request from '../../lib/request'
import { parseData } from '../../lib/utils'

// TODO: benerin halaman topup
const Topup = ({ category }) => {
  const [showDiamond, setShowDiamond] = useState(true)
  const [showStarlight, setShowStarlight] = useState(false)
  const [haveUserID, setHaveUserID] = useState(false)
  const [haveZoneID, setHaveZoneID] = useState(false)

  console.log(category)

  const diamond = () => {
    setShowDiamond(!showDiamond)
    setShowStarlight(false)
  }

  const starlight = () => {
    setShowStarlight(!showStarlight)
    setShowDiamond(false)
  }

  const getUserID = (e) => {
    if (!e.target.value) {
      setHaveUserID(true)
    } else {
      setHaveUserID(false)
    }
  }

  const getZoneID = (e) => {
    if (!e.target.value) {
      setHaveZoneID(true)
    } else {
      setHaveZoneID(false)
    }
  }

  return (
    <Container noTopMargin>
      <br className="hidden md:block" />
      <img
        className="w-full md:hidden"
        src={category.bannerImg}
        alt={category.slug}
      />
      <Wrapper className="md:flex">
        <div className="md:w-[40%] w-full md:sticky md:top-[80px] md:self-start">
          <img
            className="hidden md:block w-full rounded-2xl"
            src={category.bannerImg}
            alt={category.slug}
          />
          <div className="flex items-center mt-5">
            <img
              className="w-[80px] rounded-xl"
              src={category.logoImg}
              alt="ML"
            />
            <div className="ml-5">
              <p className="font-semibold">{category.name}</p>
              <p className="font-semibold text-gray-500">
                Shanghai Moonton Technology Co., Ltd.
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-[60%] md:mt-0 mt-10 w-full px-5">
          <div className="bg-green-200 rounded-lg">
            <Wrapper className="flex">
              <div className="w-[40px] h-[40px] text-center -mt-5 leading-[32px] border-4 border-green-200 rounded-full bg-green-500">
                1
              </div>
              <h1 className="text-2xl ml-3 pt-2 font-bold">Masukkan User ID</h1>
            </Wrapper>
            <Wrapper>
              <form className="mt-5 lg:flex-row flex-col flex items-center">
                <div className="w-full">
                  <input
                    className="px-5 py-3 w-full text-center border-2 focus:outline-none focus:ring-2 focus:ring-green-600 z-50 relative rounded-lg border-green-400"
                    placeholder="Masukkan User ID"
                    onChange={getUserID}
                  />
                  <p
                    className={`${
                      haveUserID ? 'opacity-100 mt-0' : 'opacity-0 -mt-[20px]'
                    } text-red-600 transition-all`}
                  >
                    Harus Diisi!!!
                  </p>
                </div>

                <div className="w-full">
                  <input
                    className="px-5 py-3 w-full lg:ml-3 mt-3 lg:mt-0 text-center border-2 focus:outline-none focus:ring-2 z-50 relative focus:ring-green-600 rounded-lg border-green-400"
                    placeholder="Zone ID"
                    onChange={getZoneID}
                  />
                  <p
                    className={`${
                      haveZoneID ? 'opacity-100 mt-0' : 'opacity-0 -mt-[20px]'
                    } text-red-600 transition-all lg:ml-3`}
                  >
                    Harus Diisi!!!
                  </p>
                </div>
              </form>

              <p className="mt-3 pb-2 text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Eveniet omnis sed asperiores veniam iste assumenda hic odit
                quidem exercitationem ratione?
              </p>
            </Wrapper>
          </div>

          <div className="bg-green-200 pb-5 mt-10 rounded-lg">
            <Wrapper className="flex">
              <div className="w-[40px] h-[40px] text-center -mt-5 leading-[32px] border-4 border-green-200 rounded-full bg-green-500">
                2
              </div>
              <h1 className="text-2xl ml-3 pt-2 font-bold">
                Pilih Nominal Top Up
              </h1>
            </Wrapper>
            <Wrapper>
              <div>
                <p className="font-semibold mt-5">Pilih Kategori</p>
                <div className="flex mt-3 items-center">
                  <button
                    onClick={diamond}
                    className={`${
                      showDiamond
                        ? 'border-green-600 bg-green-400'
                        : 'border-gray-400 bg-white hover:bg-green-400'
                    } flex flex-col border-2 cursor-pointer px-5 py-4 transition-all  rounded-lg justify-center items-center w-[200px] h-[130px]`}
                  >
                    <img src="/images/Diamond.png" alt="Diamond" />
                    <p className="font-[500] mt-5">Diamond</p>
                  </button>

                  <button
                    onClick={starlight}
                    className={`${
                      showStarlight
                        ? 'border-green-600 bg-green-400'
                        : 'border-gray-400 bg-white hover:bg-green-400'
                    } flex flex-col ml-3 border-2 transition-all cursor-pointer px-5 py-4 rounded-lg justify-center items-center w-[200px] h-[130px]`}
                  >
                    <img
                      className="w-[70px]"
                      src="/images/Starlight.png"
                      alt="Starlight"
                    />
                    <p className="font-[500] mt-5">Starlight Member</p>
                  </button>
                </div>
              </div>
            </Wrapper>
            <Wrapper>
              <div>
                <p className="font-semibold mt-10">Pilih Item</p>
                <div className="flex flex-wrap gap-2 items-center justify-center w-full mt-3">
                  <MLSection
                    showDiamond={showDiamond}
                    showStarlight={showStarlight}
                  />
                </div>
              </div>
            </Wrapper>
          </div>
          <Link
            href="/cart"
            className="flex mb-20 hover:scale-[1.03] shadow-lg shadow-green-300 hover:-translate-y-2 transition-all items-center w-full justify-center bg-green-200 py-3 mt-5 rounded-lg"
          >
            <Wrapper>
              <p className="text-center hover:text-gray-500 transition-all font-semibold">
                Continue to payment
              </p>
            </Wrapper>
          </Link>
        </div>
      </Wrapper>
    </Container>
  )
}

export default Topup

export const getServerSideProps = async ({ params }) => {
  console.log(params)
  const { data } = await request.get(`/categories/${params.category}`)
  const { category } = data
  if (!category) {
    return {
      notFound: true,
    }
  }

  return {
    props: parseData({ category }),
  }
}
