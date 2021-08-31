import { Provider } from 'next-auth/client'

import '@/styles/style.scss'

function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
