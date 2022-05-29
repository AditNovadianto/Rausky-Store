const TopupInfo = ({ category }) => {
  return (
    <div className="md:w-[40%] w-full md:sticky md:top-[80px] md:self-start">
      <img
        className="hidden md:block w-full rounded-2xl"
        src={category.bannerImg}
        alt={category.slug}
      />
      <div className="flex items-center mt-5">
        <img className="w-[80px] rounded-xl" src={category.logoImg} alt="ML" />
        <div className="ml-5">
          <p className="font-semibold text-xl">{category.name}</p>
          {/* <p className="font-semibold text-gray-500">Developer</p> */}
        </div>
      </div>
      <details className="block md:hidden mt-5 cursor-pointer text-gray-500">
        <summary>Description</summary>
        <p className="mt-5 text-gray-500">{category.description}</p>
      </details>
      <p className="hidden md:block mt-5 text-gray-500">
        {category.description}
      </p>
    </div>
  )
}

export default TopupInfo
