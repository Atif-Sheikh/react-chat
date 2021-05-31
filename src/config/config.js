import React, { lazy } from 'react'
import locales from './locales'
import routes from './routes'
import getMenuItems from './menuItems'
import parseLanguages from 'base-shell/lib/utils/locale'

const Loading = () => <div>Loading...</div>

const config = {
  locale: {
    defaultLocale: parseLanguages(['en', 'de', 'ru'], 'en'),
    locales,
    persistKey: 'base-shell:locale',
    onError: (e) => {
      //Uncomment this to show react-intl missing translation warnings
      //console.warn(e)
      return
    },
  },
  auth: {
    persistKey: 'base-shell:auth',
    signInURL: '/login',
  },
  routes,
  menu: {
    getMenuItems,
  },
  pages: {},
  components: {
    Menu: lazy(() => import('../containers/Menu/Menu')),
    Loading,
  },
  containers: {
    AppContainer: ({ children }) => (
      <>{children}</>
    ),

    LayoutContainer: ({ children }) => (
      <>{children}</>
    ),
  },
}

export default config
