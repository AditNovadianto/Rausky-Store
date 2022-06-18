import Link from './Link'
import Wrapper from './Wrapper'
import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import Skeleton from 'react-loading-skeleton'
import { useStateMachine } from 'little-state-machine'
import Badge from './Badge'
import { useRouter } from 'next/router'
import { ArrowLeftIcon } from '@heroicons/react/outline'

const navLinks = ['Tentang Rausky', 'Manufacturing', 'Packaging']

const Navbar = () => {
  const [search, setSearch] = useState(false)
  const { data: session, status } = useSession()
  const { state } = useStateMachine()
  const { cart } = state
  const router = useRouter()

  const showSearch = () => {
    setSearch(!search)
  }

  const totalItemsInCart = cart.length

  return (
    <>
      <div className="print:hidden bg-gray-50 py-1.5">
        <Wrapper className="flex justify-between text-sm">
          {status == 'loading' ? (
            <Skeleton width={90} />
          ) : session ? (
            <p className="font-medium">Halo {session.user.name} 👋</p>
          ) : (
            <button
              className="font-medium hover:text-green-500"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}

          <div className="space-x-5 hidden md:flex">
            {navLinks.map((link) => (
              <Link
                className="font-light text-gray-500 hover:text-green-500"
                href="#"
                key={link}
              >
                {link}
              </Link>
            ))}
          </div>
        </Wrapper>
      </div>

      <nav className="print:hidden sticky top-0 z-50 bg-white border-b">
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
              <span className="text-black hidden lg:block">Rausky</span>
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

          <div className="flex items-center">
            <button
              className="ml-10 flex-shrink-0 md:hidden"
              onClick={showSearch}
            >
              <img src="/images/Union.svg" alt="Union" />
            </button>

            <Link href="/cart" className="relative ml-4 flex-shrink-0">
              {totalItemsInCart > 0 && <Badge>{totalItemsInCart}</Badge>}

              <img src="/images/Bag.svg" alt="Bag-icon" />
            </Link>

            {/* TODO: bikin main menu */}
            <button className="ml-4 flex-shrink-0">
              <img src="/images/person.svg" alt="person" />
            </button>
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
