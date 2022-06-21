import Link from './Link'
import Wrapper from './Wrapper'
import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Skeleton from 'react-loading-skeleton'
import { useStateMachine } from 'little-state-machine'
import Badge from './Badge'
import { useRouter } from 'next/router'
import {
  ArrowLeftIcon,
  DesktopComputerIcon,
  DotsVerticalIcon,
  LoginIcon,
  LogoutIcon,
  MailIcon,
  MenuIcon,
  SunIcon,
  UserIcon,
} from '@heroicons/react/outline'
import Dropdown, { DropdownItem } from './Dropdown'
import { InformationCircleIcon, MoonIcon } from '@heroicons/react/outline'
import { useMediaQuery } from '@mui/material'
import cn from 'classnames'

// TODO: simpen theme di global state
const currentTheme = 'light'
const themes = [
  {
    name: 'device',
    Icon: DesktopComputerIcon,
    label: 'Device Preference',
  },
  {
    name: 'dark',
    Icon: MoonIcon,
    label: 'Dark',
  },
  {
    name: 'light',
    Icon: SunIcon,
    label: 'Light',
  },
]

const Navbar = () => {
  const [search, setSearch] = useState(false)
  const { data: session, status } = useSession()
  const { state } = useStateMachine()
  const { cart } = state
  const router = useRouter()
  const onMobile = useMediaQuery('(max-width: 640px)')

  const showSearch = () => {
    setSearch(!search)
  }

  const user = session?.user
  const totalItemsInCart = cart.length

  let menuItems: DropdownItem[] = [
    {
      icon: themes.find((theme) => theme.name == currentTheme).Icon,
      label: 'Theme',
      customMore: (
        <div className="flex flex-col">
          {themes.map((theme) => (
            <button
              key={theme.name}
              className={cn(
                'p-2 text-left w-full flex items-center hover:bg-gray-100 rounded-lg',
                theme.name == currentTheme
                  ? 'font-semibold text-green-500'
                  : 'font-normal text-gray-600'
              )}
            >
              <theme.Icon className="w-5 h-5 mr-2" />
              {theme.label}
            </button>
          ))}
        </div>
      ),
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
      label: 'Star Github',
      onClick: () => {
        window.open('https://github.com/AditNovadianto/Rausky-Store', '_blank')
      },
    },
    {
      icon: MenuIcon,
      label: 'Other',
      more: [
        {
          icon: InformationCircleIcon,
          label: 'About Rausky',
          onClick: () => {
            router.push('/about')
          },
        },
        {
          icon: MailIcon,
          label: 'Give us Feedback',
        },
      ],
    },
  ]

  if (onMobile && status == 'unauthenticated') {
    menuItems = [
      {
        icon: LoginIcon,
        label: 'Sign In',
        className: 'bg-green-500 text-white font-semibold',
        onClick: async () => {
          signIn()
        },
      },
      ...menuItems,
    ]
  }

  const menuItemsWithUser: DropdownItem[] = [
    {
      icon: UserIcon,
      label: 'Your Profile',
      onClick: () => {
        router.push('/profile')
      },
    },
    ...menuItems,
    {
      icon: LogoutIcon,
      label: 'Sign Out',
      onClick: async () => {
        // https://next-auth.js.org/getting-started/client#specifying-a-callbackurl-1
        await signOut({
          redirect: false, // no page reload
        })
        if (router.route != '/') {
          router.push('/')
        }
      },
    },
  ]

  return (
    <>
      <div className="print:hidden bg-yellow-100 py-1.5">
        <Wrapper>
          <p className="text-sm font-medium text-center">
            For now, all payments and transactions are not real (still in
            sandbox mode).{' '}
            <Link
              href="/blog/rausky-payments"
              className="text-blue-500 hover:underline"
            >
              Learn more
            </Link>
          </p>
        </Wrapper>
      </div>

      <nav className="print:hidden sticky top-0 z-50 bg-white shadow-sm">
        <Wrapper className="flex items-center w-full justify-between py-2.5 lg:py-2">
          {router.route == '/' ? (
            <Link
              href="/"
              className="flex font-semibold items-center text-xl -ml-2"
            >
              <img
                src="/images/rausky-logo.png"
                alt="rausky-logo"
                className="w-[40px]"
              />
              <span className="text-black">Rausky</span>
            </Link>
          ) : (
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium hidden md:block">Back</span>
            </Link>
          )}

          <div className="items-center hidden md:flex">
            <button className="hidden ml-10 flex-shrink-0" onClick={showSearch}>
              <img src="/images/Union.svg" alt="Union" />
            </button>

            <form className="md:block hidden px-5 w-full">
              <label className="relative block w-full">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <img src="/images/Union.svg" alt="" />
                </span>
                <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full rounded-md py-2 pl-12 pr-3 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-400"
                  placeholder="Search for anything..."
                  type="text"
                  name="search"
                />
              </label>
            </form>
          </div>

          {/* SEARCH BUTTON (MOBILE) */}
          <div className="flex items-center">
            <button
              className="flex-shrink-0 p-2 md:hidden"
              onClick={showSearch}
            >
              <img src="/images/Union.svg" alt="Union" />
            </button>

            {/* CART BUTTON */}
            <Link
              href="/cart"
              className="relative flex-shrink-0 rounded-md p-2 hover:bg-gray-100"
            >
              {totalItemsInCart > 0 && <Badge>{totalItemsInCart}</Badge>}

              <img src="/images/Bag.svg" alt="Bag-icon" />
            </Link>

            {/* PROFILE BUTTON */}
            {/* TODO: bikin main menu */}
            <div className="md:ml-2">
              {status == 'loading' ? (
                <div className="flex items-center">
                  <Skeleton width={24} height={24} circle={true} />
                  {!onMobile && <Skeleton width={50} height="100%" />}
                </div>
              ) : (
                <div>
                  {user ? (
                    // USER DROPDOWN
                    <Dropdown
                      items={menuItemsWithUser}
                      className="flex items-center flex-shrink-0 rounded-md -mr-2 p-2 hover:bg-gray-100"
                      deps={[session]}
                      minWidth={280}
                    >
                      <img
                        className="w-6 h-6 object-cover rounded-full"
                        src={user?.image}
                        alt={user?.name}
                      />
                      <span className="hidden md:block font-medium max-w-[10ch] truncate ml-2">
                        {user?.name}
                      </span>
                    </Dropdown>
                  ) : (
                    <div className="flex items-center">
                      {/* NO USER DROPDOWN */}
                      <Dropdown
                        items={menuItems}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 md:mr-2"
                        minWidth={280}
                      >
                        <DotsVerticalIcon className="w-5 text-gray-500" />
                      </Dropdown>
                      <button
                        onClick={() => signIn()}
                        className="hidden md:block bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-md font-semibold"
                      >
                        Sign In
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Wrapper>

        {search && (
          <form className="md:hidden flex items-center pb-5 justify-center w-full">
            <Wrapper>
              <label className="relative block w-full">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <img src="/images/Union.svg" alt="" />
                </span>
                <input
                  autoFocus
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full rounded-md py-2 pl-12 pr-3 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-400"
                  placeholder="Search for anything..."
                  type="text"
                  name="search"
                />
              </label>
            </Wrapper>
          </form>
        )}
      </nav>
    </>
  )
}

export default Navbar
