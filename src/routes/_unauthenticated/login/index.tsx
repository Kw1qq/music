import { createFileRoute } from '@tanstack/react-router'

import LoginSection from './-components/login-section'

export const Route = createFileRoute('/_unauthenticated/login/')({
  component: RouteComponent
})

function RouteComponent() {
  return <LoginSection />
}
