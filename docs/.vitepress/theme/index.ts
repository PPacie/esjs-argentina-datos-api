import { theme, useOpenapi } from 'vitepress-theme-openapi'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { ApiClient } from '@scalar/api-client'

import spec from '../../public/openapi.json' assert {type: 'json'}
import DashboardButton from '@/theme/auth/DashboardButton.vue'
import 'vitepress-theme-openapi/dist/style.css'
import './style.css'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(DashboardButton),
    })
  },
  enhanceApp({ app }) {
    const openapi = useOpenapi()
    openapi.setSpec(spec)
    theme.enhanceApp({ app })

    app.component('ApiClient', ApiClient)
  },
}
