import { useState } from 'react'

const Diamond = ({
  Diamond1,
  Diamond2,
  Diamond3,
  Diamond4,
  Diamond5,
  Diamond6,
  Diamond7,
  Diamond8,
  Diamond9,
  Diamond10,
  Diamond11,
  Diamond12,
  Diamond13,
  Diamond14,
  Diamond15,
  Diamond16,
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

  return (
    <>
      {Diamond1 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">3 Diamond</p>
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

      {Diamond2 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">5 Diamond</p>
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

      {Diamond3 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">11 Diamond + 1 Bonus</p>
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

      {Diamond4 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">17 Diamond + 2 Bonus</p>
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

      {Diamond5 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">25 Diamond + 3 Bonus</p>
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

      {Diamond6 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50orless_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">40 Diamond + 4 Bonus</p>
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

      {Diamond7 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50ormore_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">53 Diamond + 6 Bonus</p>
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

      {Diamond8 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/50ormore_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">77 Diamond + 8 Bonus</p>
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

      {Diamond9 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/150orMore_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">154 Diamond + 16 Bonus</p>
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

      {Diamond10 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/150orMore_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">217 Diamond + 23 Bonus</p>
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

      {Diamond11 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/150orMore_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">256 Diamond + 40 Bonus</p>
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

      {Diamond12 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/150orMore_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">367 Diamond + 41 Bonus</p>
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

      {Diamond13 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/500orMore_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">503 Diamond + 65 Bonus</p>
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

      {Diamond14 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/500orMore_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">774 Diamond + 101 Bonus</p>
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

      {Diamond15 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/1500orMore_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">1708 Diamond + 302 Bonus</p>
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

      {Diamond16 && (
        <div className="fixed flex items-center justify-between p-3 bottom-0 left-0 right-0 bg-green-300">
          <img src="/images/Bag.svg" alt="" />
          <div className="flex items-center">
            <img
              className="w-[50px]"
              src="https://cdn1.codashop.com/S/content/common/images/denom-image/MLBB/100x100/1500orMore_MLBB_Diamonds.png"
              alt=""
            />
            <p className="ml-5 font-semibold">4003 Diamond + 827 Bonus</p>
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
    </>
  )
}

export default Diamond
