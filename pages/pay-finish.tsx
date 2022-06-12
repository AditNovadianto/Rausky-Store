import { CodeIcon, PrinterIcon } from '@heroicons/react/outline'
import { useStateMachine } from 'little-state-machine'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Container from '../components/Container'
import Wrapper from '../components/Wrapper'
import { isObjectEmpty } from '../lib/utils'
import {
  CreditCardIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline'
import ProductItem from '../components/ProductItem'

// TODO: update hrefnya
const contacts = [
  {
    id: 'ig',
    name: 'Instagram',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1025px-Instagram-Icon.png',
    href: '#',
  },
  {
    id: 'wa',
    name: 'WhatsApp',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png',
    href: '#',
  },
  {
    id: 'line',
    name: 'LINE',
    img: 'http://assets.stickpng.com/images/580b57fcd9996e24bc43c523.png',
    href: '#',
  },
]

const PayFinish = () => {
  const { state } = useStateMachine()
  const [loading, setLoading] = useState(true)
  const { orderFinish } = state
  const router = useRouter()
  const { orderId } = router.query

  console.log(orderFinish)

  useEffect(() => {
    const checkOrder = async () => {
      if (isObjectEmpty(orderFinish)) {
        if (!orderId) {
          router.replace('/')
          return
        }
        // TODO: get data order di db dari orderId, terus simpen ke orderFinish
      }
      setLoading(false)
    }
    checkOrder()
  }, [])

  if (loading) return <div>loading</div>

  return (
    <Container>
      <Wrapper className="flex flex-col-reverse lg:flex-row">
        {/* ORDER PREVIEW */}
        <div className="print:hidden flex-[1] overflow-hidden mt-10 lg:mt-0 lg:mr-10 lg:sticky lg:top-[80px] lg:self-start">
          <h2 className="font-semibold text-xl flex items-center">
            <CodeIcon className="w-6 h-6 mr-2" /> Order Preview
          </h2>
          <pre className="mt-2 overflow-auto max-h-[70vh] bg-gray-800 text-green-500 rounded-2xl p-5">
            {JSON.stringify(orderFinish, null, 2)}
          </pre>
        </div>
        <div className="flex-[1]">
          <h3 className="font-semibold text-2xl">
            Thanks for your orders
            {orderFinish.user?.name ? `, ${orderFinish.user.name}` : ''}! ✅
          </h3>

          <div className="mt-5">
            <p className="text-xl font-medium">Your order has been processed</p>
            <p className="text-sm text-gray-400">Order ID: {orderFinish.id}</p>
          </div>

          {/* ORDER INFORMATION */}
          <div className="mt-5 flex space-x-4">
            <div className="w-full font-medium text-sm p-2 border border-t-4 border-t-green-500 rounded-xl">
              <h3 className="flex items-center">
                Payment method <CreditCardIcon className="w-4 h-4 ml-1" />
              </h3>
              <p className="text-gray-500">{orderFinish.paymentMethod}</p>
            </div>
            <div className="w-full font-medium text-sm p-2 border border-t-4 border-t-green-500 rounded-xl">
              <h3 className="flex items-center">
                Status <CheckCircleIcon className="w-4 h-4 ml-1" />
              </h3>
              <p className="text-gray-500">{orderFinish.status}</p>
            </div>
            <div className="w-full font-medium text-sm p-2 border border-t-4 border-t-green-500 rounded-xl">
              <h3 className="flex items-center">
                Paid At <ClockIcon className="w-4 h-4 ml-1" />
              </h3>
              <p className="text-gray-500">
                {new Date(orderFinish.paidAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* PRODUCT LIST */}
          <div className="mt-10">
            <h3 className="font-semibold text-xl">Products</h3>
            <div className="mt-8 space-y-8">
              {orderFinish.products.map((item) => (
                <ProductItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-10 flex space-x-4">
            {/* ORDER SUMMARY */}
            <div className="flex-[2] p-4 pb-8 print:pb-4 border rounded-2xl">
              <h3 className="font-semibold text-xl">Summary</h3>
              <div className="mt-2 flex justify-between text-gray-500">
                <p>Pajak</p>
                <p>Rp {orderFinish.tax.toLocaleString()}</p>
              </div>
              <div className="mt-2 flex justify-between text-gray-500">
                <p>Diskon</p>
                <p>Rp {orderFinish.discount.toLocaleString()}</p>
              </div>
              <div className="flex mt-4 p-4 print:p-0 rounded-2xl justify-between text-xl font-semibold bg-green-500 text-white print:text-black print:shadow-none shadow-xl shadow-green-300">
                <p className="">Total</p>
                <p>Rp {orderFinish.total.toLocaleString()}</p>
              </div>
            </div>
            {/* CONTACT */}
            <div className="print:hidden flex-[1] p-4 border rounded-2xl text-gray-500">
              <p>
                <span className="font-semibold text-black">
                  Punya pertanyaan ?
                </span>{' '}
                <br /> kontak kami melalui:
              </p>
              <div className="flex flex-col mt-4 space-y-1">
                {contacts.map((contact) => (
                  <a
                    key={contact.id}
                    href={contact.href}
                    className="flex items-center"
                  >
                    <img
                      src={contact.img}
                      alt={contact.id}
                      className="w-4 h-4 mr-2"
                    />
                    {contact.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* PRINT BUTTON */}
          <button
            onClick={print}
            className="print:hidden mt-5 w-full flex items-center justify-center py-3 rounded-2xl border border-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-colors"
          >
            <PrinterIcon className="w-5 h-5 mr-2" /> Print
          </button>
        </div>
      </Wrapper>
    </Container>
  )
}

export default PayFinish