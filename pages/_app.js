import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '../prismicio'
import Link from 'next/link'
import GlobalStyle from '../styles/globalStyles'

const MyApp = ({ Component, pageProps }) => {
  return (
    <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
      <PrismicPreview repositoryName={repositoryName}>
        <GlobalStyle />
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
  )
}

export default MyApp
