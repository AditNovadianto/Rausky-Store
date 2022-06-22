import {
  ChartPieIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/outline'
import cn from 'classnames'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from '../../components/Link'

const sidebarLinks = [
  {
    Icon: ChartPieIcon,
    path: '/',
    label: 'Overview',
  },
  {
    Icon: ShoppingCartIcon,
    path: '/orders',
    label: 'Orders',
  },
  {
    Icon: ShoppingBagIcon,
    path: '/products',
    label: 'Products',
  },
  {
    Icon: UserIcon,
    path: '/users',
    label: 'Users',
  },
]

const AdminContainer = ({ children, user }) => {
  const router = useRouter()

  const currentPage =
    sidebarLinks.find(
      (link) =>
        link.label.toLowerCase() == router.route.replace(/\/admin\/?/, '')
    ) || sidebarLinks[0]

  return (
    <div className="flex">
      <Head>
        <title>{currentPage.label} - Rausky Admin</title>
      </Head>
      <aside className="flex-[1] h-screen py-2 pl-8">
        <div className="flex items-center">
          <img
            className="w-20 -ml-5"
            src="/images/rausky-logo.png"
            alt="rausky logo"
          />
          <div>
            <h3 className="font-bold text-xl">Rausky</h3>
            <span className="text-[10px] font-bold tracking-wide bg-green-500 text-white px-2 py-1 rounded-md">
              ADMIN
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-col space-y-2.5">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              href={'/admin' + link.path}
              className={cn(
                'font-medium flex items-center',
                (router.route.replace('/admin', '') || '/') == link.path
                  ? 'scale-110 origin-left text-green-500'
                  : 'text-gray-500 hover:text-gray-600'
              )}
            >
              <link.Icon className="w-5 h-5 mr-2" />
              {link.label}
            </Link>
          ))}
        </div>
      </aside>
      <div className="flex-[6] h-screen flex bg-green-50 flex-col overflow-auto">
        <header className="mt-6 mb-3 px-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold flex items-center">
            <currentPage.Icon className="w-8 h-8 mr-2" /> {currentPage.label}
          </h2>
          <div>
            <button className="flex items-center">
              <img
                src={user.image}
                alt={user.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              <span className="font-semibold truncate max-w-[10ch]">
                {user.name}
              </span>
            </button>
          </div>
        </header>
        <div className="p-5 h-full">
          <div className="bg-white p-4 rounded-2xl shadow-xl shadow-green-100 h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminContainer
