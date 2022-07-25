import Head from 'next/head'
import { FC } from 'react'
import Navbar from './Navbar'

interface Props {
  title?: string
  noNavbar?: boolean
  noTopMargin?: boolean
}

const head = {
  title: 'Rausky Gamestore',
}

const Container: FC<Props> = ({ title, children, noNavbar, noTopMargin }) => {
  return (
    <main>
      <Head>
        <title>{title ? `${title} - ${head.title}` : head.title}</title>
        <meta name="title" content="Rausky Gamestore" />
        <meta
          name="description"
          content="#1 Online Topup store. We provide the best experience to fulfill your entertainment needs."
        />
        <meta
          name="keywords"
          content="rausky, rausky store, rausky gamestore, topup"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Rausky Store" />
        <meta
          property="og:description"
          content="#1 Online Topup store. We provide the best experience to fulfill your entertainment needs."
        />
        <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Rausky Store" />
        <meta
          property="twitter:description"
          content="#1 Online Topup store. We provide the best experience to fulfill your entertainment needs."
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />
      </Head>

      {!noNavbar && <Navbar />}
      {!noTopMargin && <br />}
      {children}
      <br />
      {/* TODO: bikin footer */}
    </main>
  )
}

export default Container
