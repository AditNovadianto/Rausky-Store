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
        <link rel="shortcut icon" href="/images/favicon.png" type="image/png" />
        {/* TODO: tambahin meta: description, dll */}
      </Head>
      <Navbar />
      {children}
    </main>
  )
}

export default Container
