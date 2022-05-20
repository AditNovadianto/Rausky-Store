import { useState } from 'react'
import Container from '../../components/Container'
import Wrapper from '../../components/Wrapper'
import Link from '../../components/Link'
import MLSection from './MlSection'
import request from '../../lib/request'
import { parseData } from '../../lib/utils'

const topup = ({ category }) => {
  const [showDiamond, setShowDiamond] = useState(true)
  const [showStarlight, setShowStarlight] = useState(false)
  const [haveUserID, setHaveUserID] = useState(false)
  const [haveZoneID, setHaveZoneID] = useState(false)

  console.log(category)

  const Diamonds = [
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png',
      value: 3,
      title: ' Diamonds',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png',
      value: 5,
      title: ' Diamonds',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png',
      value: 11,
      title: ' Diamonds',
      bonus: ' + 1 Bonus',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png',
      value: 17,
      title: ' Diamonds',
      bonus: ' + 2 Bonus',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png',
      value: 25,
      title: ' Diamonds',
      bonus: ' + 3 Bonus',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png',
      value: 40,
      title: ' Diamonds',
      bonus: ' + 4 Bonus',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50ormore_MLBB_Diamonds.png',
      value: 53,
      title: ' Diamonds',
      bonus: ' + 6 Bonus',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50ormore_MLBB_Diamonds.png',
      value: 77,
      title: ' Diamonds',
      bonus: ' + 8 Bonus',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/150orMore_MLBB_Diamonds.png',
      value: 154,
      title: ' Diamonds',
      bonus: ' + 16 Bonus',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/150orMore_MLBB_Diamonds.png',
      value: 217,
      title: ' Diamonds',
      bonus: ' + 23 Bonus',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/150orMore_MLBB_Diamonds.png',
      value: 256,
      title: ' Diamonds',
      bonus: ' + 40 Bonus',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/150orMore_MLBB_Diamonds.png',
      value: 367,
      title: ' Diamonds',
      bonus: ' + 41 Bonus',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/500orMore_MLBB_Diamonds.png',
      value: 503,
      title: ' Diamonds',
      bonus: ' + 65 Bonus',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/500orMore_MLBB_Diamonds.png',
      value: 774,
      title: ' Diamonds',
      bonus: ' + 101 Bonus',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/1500orMore_MLBB_Diamonds.png',
      value: 1708,
      title: ' Diamonds',
      bonus: ' + 302 Bonus',
    },
    {
      logo: '/images/Diamond.png',
      value: 4003,
      title: ' Diamonds',
      bonus: ' + 827 Bonus',
    },
  ]

  const Starlights = [
    {
      logo: '/images/Starlight.png',
      title: 'Starlight Member',
    },
    {
      logo: '/images/Starlight.png',
      title: 'Starlight + 390 Diamonds',
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/TwilightPass_MLBB.png',
      title: 'Twilight Pass',
    },
    {
      logo: '/images/Starlight.png',
      title: 'Starlight Member Plus',
    },
  ]

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
    <Container>
      <div className="md:flex">
        <div className="md:w-[40%] w-full">
          <img className="w-full" src="/images/ML.jpg" alt="ML" />

          <Wrapper>
            <div className="flex items-center mt-5">
              <img
                className="w-[80px] rounded-xl"
                src="/images/ML2.png"
                alt="ML"
              />
              <div className="ml-5">
                <p className="font-semibold">Mobile Legends: Bang Bang</p>
                <p className="font-semibold text-gray-500">
                  Shanghai Moonton Technology Co., Ltd.
                </p>
              </div>
            </div>

            <div className="mt-3">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quaerat velit hic autem est sit totam expedita doloremque
                inventore optio veritatis, perspiciatis eveniet, officia rerum
                accusamus iusto labore tempore ex nobis?
              </p>
              <p className="mt-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
                a consectetur sit labore ut, ipsa atque optio temporibus iste ad
                modi eos mollitia quod cupiditate magni, veniam expedita quam
                impedit quaerat reiciendis odit. Nulla expedita suscipit
                mollitia dolores eligendi, blanditiis similique! Nesciunt et
                sint ad ut sit suscipit ducimus modi?
              </p>
            </div>
          </Wrapper>
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
      </div>
    </Container>
  )
}

export default topup

export const getServerSideProps = async ({ params }) => {
  const { data } = await request.get(`/categories/${params.category}`)
  const { category } = data
  return {
    props: parseData({ category }),
  }
}
