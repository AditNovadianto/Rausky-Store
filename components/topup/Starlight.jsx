import { useState } from 'react'
import MLSection from './MLSection'

const Starlight = ({
  Starlight1,
  Starlight2,
  Starlight3,
  Starlight4,
  setStarlight4,
}) => {
  const [angka, setAngka] = useState(0)

  const tambah = () => {
    setAngka(angka + 1)
  }

  const kurang = () => {
    if (angka <= 0) {
      return
    }

    setAngka(angka - 1)
  }

  const delete4 = () => {
    setStarlight4(false)
  }

  return (
    <>
      {Starlight1 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img className="w-[50px]" src="/images/Starlight.png" alt="" />
            <p className="ml-5 font-semibold">Starlight Member</p>
          </div>
          <div className="w-max bg-gray-300 p-2 rounded-lg">
            <button
              onClick={kurang}
              className="hover:bg-white transition-all rounded-lg mx-2 px-2"
            >
              -
            </button>
            {angka}
            <button
              onClick={tambah}
              className="hover:bg-white transition-all rounded-lg mx-2 px-2"
            >
              +
            </button>
          </div>
        </div>
      )}

      {Starlight2 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img className="w-[50px]" src="/images/Starlight.png" alt="" />
            <p className="ml-5 font-semibold">Starlight + 390 Diamonds</p>
          </div>
          <div className="w-max bg-gray-300 p-2 rounded-lg">
            <button
              onClick={kurang}
              className="hover:bg-white transition-all rounded-lg mx-2 px-2"
            >
              -
            </button>
            {angka}
            <button
              onClick={tambah}
              className="hover:bg-white transition-all rounded-lg mx-2 px-2"
            >
              +
            </button>
          </div>
        </div>
      )}

      {Starlight3 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/TwilightPass_MLBB.png"
              alt=""
            />
            <p className="ml-5 font-semibold">Twilight Pass</p>
          </div>
          <div className="w-max bg-gray-300 p-2 rounded-lg">
            <button
              onClick={kurang}
              className="hover:bg-white transition-all rounded-lg mx-2 px-2"
            >
              -
            </button>
            {angka}
            <button
              onClick={tambah}
              className="hover:bg-white transition-all rounded-lg mx-2 px-2"
            >
              +
            </button>
          </div>
        </div>
      )}

      {Starlight4 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img className="w-[50px]" src="/images/Starlight.png" alt="" />
            <p className="ml-5 font-semibold">Starlight Member Plus</p>
          </div>
          <div className="w-max bg-gray-300 p-2 rounded-lg">
            <button
              onClick={kurang}
              className="hover:bg-white transition-all rounded-lg mx-2 px-2"
            >
              -
            </button>
            {angka}
            <button
              onClick={tambah}
              className="hover:bg-white transition-all rounded-lg mx-2 px-2"
            >
              +
            </button>
          </div>
          <button onClick={delete4}>delete</button>
        </div>
      )}
    </>
  )
}

export default Starlight
