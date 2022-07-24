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
import UserBadge from '../UserBadge'

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

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
      <aside className="h-screen py-2 pl-8 pr-12">
        <div className="flex items-center">
          <img
            className="w-20 -ml-5"
            src="/images/logo/rausky-logo.png"
            alt="rausky logo"
          />
          <div>
            <h3 className="font-bold text-xl">Rausky</h3>
            <UserBadge role={user.role} className="text-sm" />
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
      <div className="flex-[6] h-screen flex flex-col overflow-auto">
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
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export default AdminContainer
