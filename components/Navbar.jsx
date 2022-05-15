import Link from './Link'
import Wrapper from './Wrapper'
import { useState } from 'react'

const Navbar = () => {
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState(false)

  const navBar = () => {
    setShow(!show)
  }

  const showSearch = () => {
    setSearch(!search)
  }

  return (
    <nav>
      <div className="w-full bg-white z-50 relative">
        <Wrapper className="flex p-0 items-center w-full justify-between">
          <Link href="/" className="flex font-bold items-center text-2xl">
            <img
              src="/images/rausky-logo.png"
              alt="rausky-logo"
              className="w-[100px]"
            />
            <span className="-ml-10 w-max text-yellow-400">Rausky</span>

            <button className="md:hidden ml-10" onClick={showSearch}>
              <img src="/images/Union.svg" alt="Union" />
            </button>

            <form className="md:block hidden px-5 w-full">
              <label class="relative block w-full">
                <span class="sr-only">Search</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <img src="/images/Union.svg" alt="" />
                </span>
                <input
                  class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search for anything..."
                  type="text"
                  name="search"
                />
              </label>
            </form>
          </Link>

          <div className="flex items-center w-max">
            <a
              className="lg:block hidden focus:text-green-600 focus:after:contents-[''] focus:after:block focus:after:w-full focus:after:h-[2px] focus:after:bg-black text-[17px] transition-all font-Circular font-semibold"
              href="#"
            >
              Products
            </a>
            <a
              className="lg:block hidden focus:text-green-600 ml-10 focus:after:contents-[''] focus:after:block focus:after:w-full focus:after:h-[2px] focus:after:bg-black text-[17px] transition-all font-Circular font-semibold"
              href="#"
            >
              Story
            </a>
            <a
              className="lg:block hidden focus:text-green-600 ml-10 focus:after:contents-[''] focus:after:block focus:after:w-full focus:after:h-[2px] focus:after:bg-black text-[17px] transition-all font-Circular font-semibold"
              href="#"
            >
              Manufacturing
            </a>
            <a
              className="lg:block hidden focus:text-green-600 ml-10 focus:after:contents-[''] focus:after:block focus:after:w-full focus:after:h-[2px] focus:after:bg-black text-[17px] transition-all font-Circular font-semibold"
              href="#"
            >
              Packaging
            </a>

            <button className="ml-10 w-full">
              <img src="/images/Bag.svg" alt="Bag-icon" />
            </button>

            <button className="ml-10 w-full">
              <div className="flex flex-col items-center justify-center">
                <img src="/images/head.svg" alt="head" />
                <img src="/images/Body.svg" alt="body" />
              </div>
            </button>

            <button className="ml-10 w-full lg:hidden" onClick={navBar}>
              <img
                src={`${
                  show ? '/images/icon-close.svg' : '/images/icon-hamburger.svg'
                }`}
                alt="hamburger-logo"
              />
            </button>
          </div>
        </Wrapper>
      </div>

      {search && (
        <form className="md:hidden flex items-center mt-1 px-5 mb-5 justify-center w-full">
          <label class="relative block w-full">
            <span class="sr-only">Search</span>
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <img src="/images/Union.svg" alt="" />
            </span>
            <input
              class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
          </label>
        </form>
      )}

      <div
        className={`${
          show ? 'translate-y-0' : '-translate-y-[400px]'
        } w-[90%] lg:hidden m-auto flex items-center -z-50 justify-center flex-col bg-green-100 py-7 transition-all`}
      >
        <a
          className="focus:text-green-600 focus:after:contents-[''] focus:after:block focus:after:w-full focus:after:h-[2px] focus:after:bg-black text-[17px] transition-all font-Circular font-semibold"
          href="#"
        >
          Products
        </a>
        <a
          className="focus:text-green-600 focus:after:contents-[''] focus:after:block focus:after:w-full focus:after:h-[2px] focus:after:bg-black text-[17px] transition-all mt-3 font-Circular font-semibold"
          href="#"
        >
          Story
        </a>
        <a
          className="focus:text-green-600 focus:after:contents-[''] focus:after:block focus:after:w-full focus:after:h-[2px] focus:after:bg-black text-[17px] transition-all mt-3 font-Circular font-semibold"
          href="#"
        >
          Manufacturing
        </a>
        <a
          className="focus:text-green-600 focus:after:contents-[''] focus:after:block focus:after:w-full focus:after:h-[2px] focus:after:bg-black text-[17px] transition-all mt-3 font-Circular font-semibold"
          href="#"
        >
          Packaging
        </a>
      </div>
    </nav>
  )
}

export default Navbar
