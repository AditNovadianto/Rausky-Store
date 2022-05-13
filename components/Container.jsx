import Head from 'next/head'
import Navbar from './Navbar'

const head = {
  title: 'Rausky Store',
}

const Container = ({ title, children }) => {
  return (
    <main>
      <Head>
        <title>{title ? `${title} - ${head.title}` : head.title}</title>
        {/* TODO: tambahin meta: description, dll */}
        {/* TODO: tambahin icon rausky store */}
      </Head>
      <Navbar />
      {children}
    </main>
  )
}

export default Container
