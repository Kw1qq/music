import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { refreshAuth } from '@/api/auth/refresh-auth'

import ErrorComponent from '../-components/error-component'

export const Route = createFileRoute('/_unauthenticated')({
  component: RouteComponent,
  errorComponent: () => <ErrorComponent routeId={Route.id} />,
  beforeLoad: async () => {
    let isAuthed = false
    try {
      await refreshAuth()
      isAuthed = true
    } catch (error) {
      console.error(error)
    }

    if (isAuthed) {
      throw redirect({
        to: '/',
        replace: true
      })
    }
  }
})

function RouteComponent() {
  return <Outlet />
}
