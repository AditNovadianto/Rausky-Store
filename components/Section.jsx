import { useState } from 'react'
import Link from './Link'

const Section = ({ show }) => {
  const [drop, setDrop] = useState(false)

  const dropDown = () => {
    setDrop(!drop)
  }

  const sections = [
    {
      logo: 'Lightning',
      title: 'New In',
    },
    {
      logo: 'Clothing',
      title: 'Clothing',
    },
    {
      logo: 'Shoes',
      title: 'Shoes',
    },
    {
      logo: 'Accessories',
      title: 'Accessories',
    },
    {
      logo: 'Activewear',
      title: 'Activewear',
    },
    {
      logo: 'Gifts',
      title: 'Gifts & Living',
    },
    {
      logo: 'Inspiration',
      title: 'Inspiration',
      after:
        "after:contents-[''] font-[500] after:block after:w-full after:mt-3 after:h-[2px] after:bg-black after:rounded-full after:opacity-20",
    },
  ]

  return (
    <div>
      <button
        onClick={dropDown}
        className="flex z-30 relative items-center justify-between px-4 py-3 tracking-[1px] font-semibold text-left bg-green-200 w-full rounded-2xl"
      >
        <p>Categories</p>

        {drop ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180 transition-all h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>

      <div
        className={`${
          drop ? 'h-max scale-[1]' : 'h-0 scale-[0]'
        } flex flex-col -z-[200] rounded -mt-4 font-[500] transition-all px-5 py-8 bg-green-100`}
      >
        <Link
          className="hover:text-green-500 transition-all font-[500]"
          href="/"
        >
          User
        </Link>

        <Link
          className="after:contents-[''] transition-all hover:text-green-500 mt-3 font-[500] after:block after:w-full after:mt-3 after:h-[2px] after:bg-black after:rounded-full after:opacity-20"
          href="/"
        >
          Username@gmail.com
        </Link>

        {sections.map((section, index) => (
          <>
            <Link
              key={index}
              className="flex mt-4 font-[500] hover:bg-white rounded-lg transition-all p-2"
              href={`/${section.logo}`}
            >
              <img
                className="w-[20px] "
                src={`/images/${section.logo}.svg`}
                alt={`${section.logo}`}
              />
              <p className="ml-3">{section.title}</p>
            </Link>

            <div className={`${section.after}`}></div>
          </>
        ))}

        <Link
          className="mt-4 hover:text-green-500 transition-all font-[500]"
          href="/Signout"
        >
          Sign Out
        </Link>
      </div>
    </div>
  )
}

export default Section
