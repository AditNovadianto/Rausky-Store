import { useState } from 'react'
import Diamond from './Diamond'
import Starlight from './Starlight'

const DiamondSection = ({ showDiamond, showStarlight }) => {
  const [diamond1, setDiamond1] = useState(false)
  const [diamond2, setDiamond2] = useState(false)
  const [diamond3, setDiamond3] = useState(false)
  const [diamond4, setDiamond4] = useState(false)
  const [diamond5, setDiamond5] = useState(false)
  const [diamond6, setDiamond6] = useState(false)
  const [diamond7, setDiamond7] = useState(false)
  const [diamond8, setDiamond8] = useState(false)
  const [diamond9, setDiamond9] = useState(false)
  const [diamond10, setDiamond10] = useState(false)
  const [diamond11, setDiamond11] = useState(false)
  const [diamond12, setDiamond12] = useState(false)
  const [diamond13, setDiamond13] = useState(false)
  const [diamond14, setDiamond14] = useState(false)
  const [diamond15, setDiamond15] = useState(false)
  const [diamond16, setDiamond16] = useState(false)
  const [starlight1, setStarlight1] = useState(false)
  const [starlight2, setStarlight2] = useState(false)
  const [starlight3, setStarlight3] = useState(false)
  const [starlight4, setStarlight4] = useState(false)

  const starlightButton1 = () => {
    setStarlight1(!starlight1)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
  }

  const starlightButton2 = () => {
    setStarlight1(false)
    setStarlight2(!starlight2)
    setStarlight3(false)
    setStarlight4(false)
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
  }

  const starlightButton3 = () => {
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(!starlight3)
    setStarlight4(false)
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
  }

  const starlightButton4 = () => {
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(!starlight4)
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
  }

  const diamondButton1 = () => {
    setDiamond1(!diamond1)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton2 = () => {
    setDiamond1(false)
    setDiamond2(!diamond2)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton3 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(!diamond3)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton4 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(!diamond4)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton5 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(!diamond5)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton6 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(!diamond6)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton7 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(!diamond7)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton8 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(!diamond8)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton9 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(!diamond9)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton10 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(!diamond10)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton11 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(!diamond11)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton12 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(!diamond12)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton13 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(!diamond13)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton14 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(!diamond14)
    setDiamond15(false)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton15 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(!diamond15)
    setDiamond16(false)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const diamondButton16 = () => {
    setDiamond1(false)
    setDiamond2(false)
    setDiamond3(false)
    setDiamond4(false)
    setDiamond5(false)
    setDiamond6(false)
    setDiamond7(false)
    setDiamond8(false)
    setDiamond9(false)
    setDiamond10(false)
    setDiamond11(false)
    setDiamond12(false)
    setDiamond13(false)
    setDiamond14(false)
    setDiamond15(false)
    setDiamond16(!diamond16)
    setStarlight1(false)
    setStarlight2(false)
    setStarlight3(false)
    setStarlight4(false)
  }

  const Starlights = [
    {
      logo: '/images/Starlight.png',
      title: 'Starlight Member',
      button: starlightButton1,
    },
    {
      logo: '/images/Starlight.png',
      title: 'Starlight + 390 Diamonds',
      button: starlightButton2,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/TwilightPass_MLBB.png',
      title: 'Twilight Pass',
      button: starlightButton3,
    },
    {
      logo: '/images/Starlight.png',
      title: 'Starlight Member Plus',
      button: starlightButton4,
    },
  ]

  const Diamonds = [
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png',
      value: 3,
      title: ' Diamonds',
      button: diamondButton1,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png',
      value: 5,
      title: ' Diamonds',
      button: diamondButton2,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png',
      value: 11,
      title: ' Diamonds',
      bonus: ' + 1 Bonus',
      button: diamondButton3,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png',
      value: 17,
      title: ' Diamonds',
      bonus: ' + 2 Bonus',
      button: diamondButton4,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png',
      value: 25,
      title: ' Diamonds',
      bonus: ' + 3 Bonus',
      button: diamondButton5,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png',
      value: 40,
      title: ' Diamonds',
      bonus: ' + 4 Bonus',
      button: diamondButton6,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50ormore_MLBB_Diamonds.png',
      value: 53,
      title: ' Diamonds',
      bonus: ' + 6 Bonus',
      button: diamondButton7,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50ormore_MLBB_Diamonds.png',
      value: 77,
      title: ' Diamonds',
      bonus: ' + 8 Bonus',
      button: diamondButton8,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/150orMore_MLBB_Diamonds.png',
      value: 154,
      title: ' Diamonds',
      bonus: ' + 16 Bonus',
      button: diamondButton9,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/150orMore_MLBB_Diamonds.png',
      value: 217,
      title: ' Diamonds',
      bonus: ' + 23 Bonus',
      button: diamondButton10,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/150orMore_MLBB_Diamonds.png',
      value: 256,
      title: ' Diamonds',
      bonus: ' + 40 Bonus',
      button: diamondButton11,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/150orMore_MLBB_Diamonds.png',
      value: 367,
      title: ' Diamonds',
      bonus: ' + 41 Bonus',
      button: diamondButton12,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/500orMore_MLBB_Diamonds.png',
      value: 503,
      title: ' Diamonds',
      bonus: ' + 65 Bonus',
      button: diamondButton13,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/500orMore_MLBB_Diamonds.png',
      value: 774,
      title: ' Diamonds',
      bonus: ' + 101 Bonus',
      button: diamondButton14,
    },
    {
      logo: 'https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/1500orMore_MLBB_Diamonds.png',
      value: 1708,
      title: ' Diamonds',
      bonus: ' + 302 Bonus',
      button: diamondButton15,
    },
    {
      logo: '/images/Diamond.png',
      value: 4003,
      title: ' Diamonds',
      bonus: ' + 827 Bonus',
      button: diamondButton16,
    },
  ]

  return (
    <>
      {showDiamond &&
        Diamonds.map((diamond, index) => (
          <button
            onClick={diamond.button}
            key={index}
            className="flex flex-col border-2 overflow-hidden relative focus:border-green-600 focus:bg-green-400 hover:bg-green-100 border-gray-400 cursor-pointer px-5 py-4 transition-all bg-white rounded-lg justify-center text-center items-center h-[220px] w-[150px]"
          >
            <div className="w-max py-1 px-3 rounded absolute top-0 left-0 bg-gray-400">
              +
            </div>

            <img src={diamond.logo} alt="Diamond" />
            <p className="font-[500] mt-5">
              {diamond.value}
              {diamond.title}
              {diamond.bonus}
            </p>
          </button>
        ))}

      {showStarlight &&
        Starlights.map((starlight, index) => (
          <button
            onClick={starlight.button}
            key={index}
            className="flex flex-col border-2 focus:border-green-600 focus:bg-green-400 hover:bg-green-100 border-gray-400 cursor-pointer px-5 py-4 transition-all bg-white rounded-lg justify-center text-center items-center h-[220px] w-[150px]"
          >
            <img className="w-max" src={starlight.logo} alt="starlight" />
            <p className="font-[500] mt-5">{starlight.title}</p>
          </button>
        ))}

      <Diamond
        Diamond1={diamond1}
        Diamond2={diamond2}
        Diamond3={diamond3}
        Diamond4={diamond4}
        Diamond5={diamond5}
        Diamond6={diamond6}
        Diamond7={diamond7}
        Diamond8={diamond8}
        Diamond9={diamond9}
        Diamond10={diamond10}
        Diamond11={diamond11}
        Diamond12={diamond12}
        Diamond13={diamond13}
        Diamond14={diamond14}
        Diamond15={diamond15}
        Diamond16={diamond16}
      />

      <Starlight
        Starlight1={starlight1}
        Starlight2={starlight2}
        Starlight3={starlight3}
        Starlight4={starlight4}
        setStarlight4={setStarlight4}
      />
    </>
  )
}

export default DiamondSection
