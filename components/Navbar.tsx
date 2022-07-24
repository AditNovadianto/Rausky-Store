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
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  MailIcon,
  MenuIcon,
  SunIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/outline'
import Dropdown, { DropdownItem } from './Dropdown'
import { InformationCircleIcon, MoonIcon } from '@heroicons/react/outline'
import { useMediaQuery } from '@mui/material'
import cn from 'classnames'
import { StarIcon } from '@heroicons/react/solid'
import UserBadge from './UserBadge'
import { User } from '../types/next-auth'
import { useDebounce, useUpdateEffect } from 'usehooks-ts'
import request from '../lib/request'
import Modal from './Modal'

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
  const { data: session, status } = useSession()
  const router = useRouter()
  const onMobile = useMediaQuery('(max-width: 640px)')

  const { state } = useStateMachine()
  const { cart } = state
  const user = session?.user as User
  const totalItemsInCart = cart.length

  const [search, setSearch] = useState(false)
  const [categorySearchResults, setCategorySearchResults] = useState([])
  const [productsSearchResults, setProductsSearchResults] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearchInput = useDebounce(searchInput, 500)
  const [isSearchNotFound, setIsSearchNotFound] = useState(false)

  const showSearchResults =
    categorySearchResults.length > 0 || productsSearchResults.length > 0

  // SEARCH HANDLER
  useUpdateEffect(() => {
    setSearchInput('')
  }, [search])

  useUpdateEffect(() => {
    if (!searchInput) {
      setIsSearchNotFound(false)
      setCategorySearchResults([])
      setProductsSearchResults([])
    }
  }, [searchInput])

  useUpdateEffect(() => {
    if (!searchInput) return

    const searchHandler = async () => {
      // search products
      const [productsResponse, categoriesResponse] = await Promise.all([
        await request.get(
          `/products?search=${searchInput}&include=category,subCategory`
        ),
        await request.get(`/categories?search=${searchInput}`),
      ])

      const productsResults = productsResponse.data.products
      const categoriesResults = categoriesResponse.data.categories

      if (productsResults.length === 0 && categoriesResults.length === 0) {
        setIsSearchNotFound(true)
      }

      setProductsSearchResults(productsResponse.data.products)
      setCategorySearchResults(categoriesResponse.data.categories)
    }

    searchHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInput])

  const toggleSearch = () => {
    setSearch(!search)
  }

  const homeItem: DropdownItem = {
    icon: HomeIcon,
    label: 'Home',
    onClick: () => router.push('/'),
  }

  let menuItems: DropdownItem[] = [
    homeItem,
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

  let menuItemsWithUser: DropdownItem[] = [
    homeItem,
    {
      icon: UserIcon,
      label: 'Your Profile',
      onClick: () => {
        router.push('/profile')
      },
    },
    {
      icon: StarIcon,
      label: 'Admin Dashboard',
      disabled: user?.role == 'USER',
      onClick: () => {
        open('/admin', '_blank')
      },
    },
    ...menuItems.slice(1),
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
            <button
              onClick={router.back}
              className="flex items-center space-x-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium hidden md:block">Back</span>
            </button>
          )}

          <div className="items-center hidden md:flex">
            <button
              className="hidden ml-10 flex-shrink-0"
              onClick={toggleSearch}
            >
              <img src="/images/Union.svg" alt="Union" />
            </button>
          </div>

          {/* SEARCH BUTTON */}
          <div className="flex items-center">
            <button className="flex-shrink-0 p-2" onClick={toggleSearch}>
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
                        {user?.displayName || user?.name}
                      </span>
                      <UserBadge role={user?.role} />
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
      </nav>

      {/* TODO: make search modal */}

      {/* SEARCH MODAL */}
      <Modal open={search} onClose={toggleSearch}>
        <header className="sticky w-full top-0 flex items-center px-5 shadow-sm bg-white">
          <img src="/images/Union.svg" alt="Union" className="w-4 h-4" />
          <input
            autoFocus
            className="focus:outline-none py-3 px-4 w-full"
            placeholder="Search for anything..."
            type="text"
            autoComplete="off"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="mt-1 hover:text-green-500" onClick={toggleSearch}>
            <XIcon className="w-5 h-5" />
          </button>
        </header>
        {/* SHOW SEARCH RESULTS */}

        {showSearchResults ? (
          <div className="p-5 pt-0 mt-4">
            {/* PRODUCTS RESULTS */}
            {productsSearchResults.length > 0 && (
              <div>
                <h3 className="text-xs font-medium bg-white text-gray-500 py-1">
                  PRODUCTS ({productsSearchResults.length})
                </h3>
                <div onClick={toggleSearch}>
                  {productsSearchResults.map((product) => (
                    <Link
                      href={`/topup/${
                        product.category.slug
                      }?title=${encodeURIComponent(product.title)}${
                        product.subCategory
                          ? `&subCategory=${encodeURIComponent(
                              product.subCategory.slug
                            )}`
                          : ''
                      }`}
                      key={product.id}
                      className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100"
                    >
                      <img
                        className="w-5 h-5 object-cover mr-1"
                        src={product.img}
                        alt={product.title}
                      />
                      <span className="truncate font-medium">
                        {product.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {/* CATEGORY RESULTS */}
            {categorySearchResults.length > 0 && (
              <div>
                <h3 className="text-xs font-medium sticky top-0 bg-white text-gray-500 py-1">
                  CATEGORIES ({categorySearchResults.length})
                </h3>
                <div onClick={toggleSearch}>
                  {categorySearchResults.map((category) => (
                    <Link
                      href={`/topup/${category.slug}`}
                      key={category.id}
                      className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100"
                    >
                      {category.logoImg ? (
                        <img
                          className="w-5 h-5 object-cover mr-1"
                          src={category.logoImg}
                          alt={category.name}
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-700 mr-1"></div>
                      )}
                      <span className="truncate font-medium">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-5 text-center">
            <h3 className="my-4 text-gray-500">
              {isSearchNotFound
                ? `${searchInput} not found`
                : 'Search results empty'}
            </h3>
          </div>
        )}
      </Modal>
    </>
  )
}

export default Navbar
