import Link from './Link'
import Wrapper from './Wrapper'
import { useState } from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import useClickOutside from '../hooks/useClickOutside'

const navLinks = ['Products', 'Story', 'Manufacturing', 'Packaging']

const Navbar = () => {
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState(false)

  const showMobileNav = () => {
    setShow(!show)
  }

  const showSearch = () => {
    setSearch(!search)
  }

  const menuRef = useClickOutside(() => {
    setShow(false)
  }, show)

  return (
    <nav className="sticky top-0">
      <div className="w-full bg-white z-50 relative border-b">
        <Wrapper className="flex items-center w-full justify-between py-2.5 lg:py-2">
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
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full rounded-md py-2 pl-12 pr-3 focus:outline-none focus:ring-green-500 focus:ring focus:ring-opacity-50 sm:text-sm"
                  placeholder="Search for anything..."
                  type="text"
                  name="search"
                />
              </label>
            </form>
          </div>

          <div className="flex items-center">
            <div className="items-center hidden lg:flex space-x-10 mr-5">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="lg:block hidden focus:text-green-500 after:contents-[''] after:block after:opacity-0 after:h-[2px] after:translate-y-4 focus:after:opacity-100 after:bg-green-500 after:rounded-full transition-all font-medium text-gray-500 hover:text-green-500"
                >
                  {link}
                </a>
              ))}
            </div>

            <button
              className="ml-10 flex-shrink-0 md:hidden"
              onClick={showSearch}
            >
              <img src="/images/Union.svg" alt="Union" />
            </button>

            <button className="ml-4 flex-shrink-0">
              <img src="/images/Bag.svg" alt="Bag-icon" />
            </button>

            <button className="ml-4 flex-shrink-0 hidden lg:block">
              <img src="/images/person.svg" alt="person" />
            </button>

            <button
              className="ml-4 lg:hidden flex-shrink-0"
              onClick={showMobileNav}
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </Wrapper>
      </div>

      {search && (
        <form className="md:hidden flex items-center mt-5 px-5 mb-5 justify-center w-full">
          <label className="relative block w-full">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img src="/images/Union.svg" alt="" />
            </span>
            <input
              autoFocus
              className="placeholder:italic placeholder:text-slate-400 block border bg-white w-full rounded-md py-2 pl-12 pr-3 focus:outline-none focus:ring-green-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
          </label>
        </form>
      )}

      <div
        ref={menuRef}
        className={`${
          show ? 'translate-y-0' : '-translate-y-[400px]'
        } w-full absolute lg:hidden flex items-center justify-center flex-col bg-green-100 py-7 transition-all`}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="focus:text-green-600 focus:after:contents-[''] focus:after:block focus:after:w-full focus:after:h-[2px] focus:after:bg-black text-[17px] transition-all font-Circular font-semibold"
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
