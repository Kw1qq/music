import { createFileRoute } from '@tanstack/react-router'

import { getMeQueryOptions } from '@/api/auth/get-me/get-me-query-options'
import ErrorComponent from '@/routes/-components/error-component'

import SettingsHeader from './-components/setting-header'
import SettingsPanel from './-components/settings-panel'

export const Route = createFileRoute('/_authenticated/settings/')({
  component: RouteComponent,
  errorComponent: () => <ErrorComponent routeId={Route.id} />,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.query(getMeQueryOptions())
  }
})

function RouteComponent() {
  return (
    <>
      <SettingsHeader />
      <SettingsPanel />
    </>
  )
}
