import Container from '../components/Container'
import Wrapper from '../components/Wrapper'
import { TrashIcon } from '@heroicons/react/outline'

const cartData = [
  {
    id: 1,
    img: 'https://play-lh.googleusercontent.com/Fmvkyn_ZNm2VTcporUnvmVWDd4nJEqs6La4wX_qGcUPPb3CHpoyb3nSu7usYagIyOEI',
    name: '200 Diamonds Mobile Legend',
    price: 200000,
    quantity: 1,
  },
  {
    id: 2,
    img: 'https://freight.cargo.site/w/3840/q/75/i/a17dfc0b27e50cb1c75dcd8fcd13a2d11783729f60265d9a00d184bc5a8d9296/VALORANT_1.png',
    name: '100 Points Valorant',
    price: 200000,
    quantity: 1,
  },
  {
    id: 3,
    img: 'https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI',
    name: 'Netflix 1 abad',
    price: 200000,
    quantity: 1,
  },
]

const Cart = () => {
  return (
    <Container>
      <Wrapper className="flex flex-col lg:flex-row justify-between lg:space-x-20">
        <div className="lg:flex-grow">
          <h2 className="text-2xl font-bold">My Cart</h2>
          <div className="space-y-8 mt-8">
            {cartData.map((item) => (
              <div key={item.id} className="flex">
                <img
                  className="w-[80px] h-[80px] object-cover rounded-2xl"
                  src={item.img}
                  alt={item.name}
                />
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-500 font-semibold">
                    Rp {item.price.toLocaleString()}
                  </p>

                  <div className="flex justify-between lg:justify-start items-center mt-4">
                    {/* SET QUANTITY */}
                    <div className="flex items-center text-gray-500">
                      <button className="w-8 h-8 rounded-xl font-medium border hover:bg-gray-800 hover:text-gray-100">
                        {' '}
                        -{' '}
                      </button>
                      <div className="px-5">{item.quantity}</div>
                      <button className="w-8 h-8 rounded-xl font-medium border hover:bg-gray-800 hover:text-gray-100">
                        {' '}
                        +{' '}
                      </button>
                    </div>

                    {/* DELETE */}
                    <button className="p-1.5 bg-gray-200 hover:bg-red-500 text-gray-500 hover:text-gray-100 rounded-xl lg:ml-5">
                      <TrashIcon className="w-5 h-5 text-current" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ORDER INFO */}
        <div className="lg:flex-grow mt-8 lg:mt-0 lg:max-w-sm lg:sticky lg:top-[80px] lg:self-start">
          <h2 className="text-2xl font-bold">Order Info</h2>
          <div className="space-y-2 mt-6">
            <div className="flex justify-between text-gray-500">
              <p>Subtotal</p>
              <p>Rp 600,000</p>
            </div>
            <div className="flex justify-between text-gray-500">
              <p>Pajak</p>
              <p>Rp 0</p>
            </div>
            <div className="flex justify-between text-gray-500">
              <p>Diskon Developer</p>
              <p>Rp 100,000</p>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <p className="">Total</p>
              <p>Rp 500,000</p>
            </div>
          </div>
          <button className="w-full py-4 bg-green-500 hover:bg-green-400 transition-all font-semibold text-white rounded-2xl my-8 shadow-xl shadow-green-300">
            Checkout (Rp 500,000)
          </button>
        </div>
      </Wrapper>
    </Container>
  )
}

export default Cart
