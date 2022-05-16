import Head from 'next/head'
import Navbar from './Navbar'

const head = {
  title: 'Rausky Store',
}

const Container = ({ title, children, noNavbar }) => {
  return (
    <main>
      <Head>
        <title>{title ? `${title} - ${head.title}` : head.title}</title>
        {/* TODO: tambahin meta: description, dll */}
      </Head>
      {!noNavbar && <Navbar />}
      <br />
      {children}
      <br />
      {/* TODO: bikin footer */}
    </main>
  )
}

export default Container
