/* eslint-disable perfectionist/sort-imports */
import '@/assets/styles/layers.css'
import { MantineProvider } from '@mantine/core'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
/* eslint-enable perfectionist/sort-imports */

import ReloadPrompt from '@/features/reload-prompt'
import LoaderComponent from '@/routes/-components/loader-component'

import { routeTree } from '../routeTree.gen'
import { createIDBPersister } from './pwa/query-persister'

import '@mantine/core/styles.layer.css'
// eslint-disable-next-line perfectionist/sort-imports
import { theme } from './theme'

import '@mantine/dates/styles.layer.css'
import '@mantine/dropzone/styles.layer.css'
import '@/assets/styles/styles.css'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
      networkMode: 'offlineFirst'
    }
  }
})

const persister = createIDBPersister()

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: {
    queryClient
  },
  getScrollRestorationKey: (location) => location.pathname,
  scrollToTopSelectors: ['#main-content'],
  defaultPendingMs: 500,
  defaultPendingComponent: LoaderComponent
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <MantineProvider defaultColorScheme='dark' theme={theme}>
      <PersistQueryClientProvider
        persistOptions={{
          persister,
          dehydrateOptions: {
            shouldDehydrateQuery: (query) => query.queryKey[0] !== 'search'
          }
        }}
        client={queryClient}
      >
        <RouterProvider router={router} />
        <ReloadPrompt />
      </PersistQueryClientProvider>
    </MantineProvider>
  )
}
