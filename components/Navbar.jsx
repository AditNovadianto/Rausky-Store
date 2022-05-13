import Link from './Link'
import Wrapper from './Wrapper'

const Navbar = () => {
  return (
    <nav>
      <Wrapper>
        <Link href="/" className="flex">
          <img src="/rausky-logo.png" alt="rausky-logo" className="w-[40px]" />
          Rausky
        </Link>
      </Wrapper>
    </nav>
  )
}

export default Navbar
