import Head from 'next/head'
import { FC } from 'react'
import Navbar from './Navbar'

interface Props {
  title?: string
  noNavbar?: boolean
  noTopMargin?: boolean
}

const head = {
  title: 'Rausky Store',
}

const Container: FC<Props> = ({ title, children, noNavbar, noTopMargin }) => {
  return (
    <main>
      <Head>
        <title>{title ? `${title} - ${head.title}` : head.title}</title>
        {/* TODO: tambahin meta: description, dll */}
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
