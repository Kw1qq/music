import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { refreshAuth } from '@/api/auth/refresh-auth'
import { useAuthStore } from '@/features/auth/use-auth-store'
import Player from '@/features/player'

import ErrorComponent from '../-components/error-component'
import Content from '../-layout/content'
import Main from '../-layout/main'
import Nav from '../-layout/nav'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  errorComponent: () => <ErrorComponent routeId={Route.id} />,
  beforeLoad: async () => {
    const accessToken = useAuthStore.getState().auth.accessToken

    if (!accessToken) {
      try {
        await refreshAuth()
      } catch {
        throw redirect({ to: '/login', replace: true })
      }
    }
  }
})

function RouteComponent() {
  return (
    <>
      <Nav />
      <Main>
        <Content>
          <Outlet />
        </Content>
        <Player />
      </Main>
    </>
  )
}
