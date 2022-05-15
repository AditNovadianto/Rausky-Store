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
        <link rel="shortcut icon" href="/images/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* TODO: tambahin meta: description, dll */}
      </Head>
      {!noNavbar && <Navbar />}
      {children}
    </main>
  )
}

export default Container
